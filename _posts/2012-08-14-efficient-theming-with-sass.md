---
layout: article
title: Efficient theming with Sass
category: thoughts
excerpt: Some personal techniques I've been using for efficiently managing your stylesheets with Sass.
keywords: sass, sass techniques, best practices
---
Even after a full year of writing stylesheets almost exclusively with Sass and Compass, I continue to find solutions to common problems that further convince me that I will never write vanilla CSS again. Creating theme sets is something I've worked heavily on in the past three to four months, and it's there that I've honed my Sass-fu and started to establish some of the material I present here. None of this is what I would consider “best practice”, but rather possible solutions that I find rather elegant. Some of this may be useful for others, and some of it may not be.

Variable semantics
------------------

Let's demonstrate a problem. Say you're developing a base stylesheet, and eventually you're going to create child themes that inherit from your base, overriding variables to change colors, dimensions, etcetera.

``` scss
$grey: #ccc !default;
$blue: #4169ff !default;

body {
  background-color: $grey;
  color: $blue;
}
```

Great. Everything looks good. Now say we get a request in to make a child theme that has green body copy. Sure, no problem. We defined our variables with !default flags so we can easily override them.

``` scss
$blue: #299126;

@import 'base';

```

You've no doubt caught on by now that we've essentially just destroyed the semantic value of our variable name. Sure, the above file will compile just fine, and even look correct in browser, but we have a variable that has essentially been decoupled from its actual assigned value.

Don't give your variables vague names assuming you'll be able to reuse them in multiple places. If you plan this out carefully, it could work. But in many cases, in my experience, you will eventually find yourself renaming variables or creating new variables anyways. Create variables with **purposeful, semantic names**:

``` scss
$body-width: 960px;
$body-background-color: #eee;
$body-copy-color: #222;

body {
  background-color: $body-background-color;
  color: $body-copy-color;
  margin: 0 auto;
  width: $body-width;
}
```

Seem like overkill? I promise you it's not, and you'll thank yourself later, as will any other developer trying to work with your themes.

Standalone config file
----------------------

We all know that one of the best parts of precompiling our stylesheets is the ability to use variables. As the ones developing and maintaining code, effective use of variables can shave hours off the time it takes to make changes or implement new features on a platform. That being said, large systems using Sass will undoubtedly end up with a considerable number of variables. All of these variables should (hopefully) be kept in a single well-documented file. For every large system I maintain stylesheets for, this file is my ```_config.scss``` partial.

The official Compass website does a decent job [explaining this concept](http://compass-style.org/help/tutorials/best_practices/), but does not explicitly state something crucial to this concept: **your configuration partial should *never* define or import any actual CSS**. Importing anything into the configuration partial that would result in actual compiled CSS ruins the ability to then import that configuration file into multiple files without duplicating code.

“Smart” variables
-----------------

Say you're developing a theme, and you have a header bar that has a background gradient. You could define the two colors of the gradient as two variables:

``` scss
$header-gradient-1: #000;
$header-gradient-2: #fff;
```

However, I find it much cleaner to store these as a list, since the naming of these two variables implies they will always be used together (and if not… rethink the semantics of your variable names):

``` scss
$header-gradient: (#000, #fff);
```

This reads much cleaner, and then you can use the native Sass ```nth``` function like such:

```
@include background(
    linear-gradient(
        nth($header-gradient, 1),
        nth($header-gradient, 2)));
```

However… this poses an issue. What happens when you have a theme to develop that SHOULDN'T use a gradient, but rather a solid color? This is when you can make good use of the built-in ```type-of``` function and some conditionals:

``` scss
@if type-of($header-gradient) == "list" {
    // Code here for a gradient background
}
@else {
    // Code here for using a solid background color
}
```

Implementing this where appropriate will result in a more flexible theming environment.

Inline your @media queries
-------------------------

This concept has [been written about before](/thoughts/passing-content-to-mixins-in-sass/), but it's worth mentioning here and expanding upon a bit. First, an example. Below we have the beginnings of a file structure for a responsive design. Simplified, yes, but bear with me. Individual sections are defined for different areas of the page, segmented by docblock-style comments. We're using a custom mixin for our responsive queries, passing content in via ```@content``` blocks. Everything looks great.

``` scss

/**
 * Base Styles
 */

// Header
[role="banner"] { }

// Body
[role="main"] { }

// Footer
[role="contentinfo"] { }

/**
 * Media Queries
 */

// Tablet
@include respond-to('tablet') { // etc… }

// Desktop
@include respond-to('desktop') { // etc… }

```

Now imagine something else: imagine that for each of the three main sections, ```header```, ```[role="main"]``` and ```[role="contentinfo"]```, we have anywhere between 500 and 1000 lines of code. Suddenly our structure seems a bit more unwieldy. When you get into the tedium of adjusting styles at multiple screen resolutions, the act of scrolling up and down through thousands of lines of code, several times each minute, becomes a chore. Luckily, the solution here is easy.

**Write your media queries inline with the base styles.** Seriously, do it. Keeping media queries in proximity to the base styles does two things: it reduces the obnoxious amount of scrolling between sections while writing styles for different breakpoints, and, maybe most importantly, *contextualizes the content being passed into the media queries*. Often times the styles being set at specific breakpoints are there to override or set properties not present at other resolutions. In other words… most of the styles we write in media queries are meaningless without seeing the base styles to compare.

``` scss

/**
 * Header
 */

[role="banner"] {

  // Base styles…

  @include respond-to('tablet') {
    // Tablet styles…
  }

  @include respond-to('desktop') {
    // Desktop styles…
  }

}

```

Are there implications of writing your media queries inline like this? Yes, there are. Namely, you're going to end up with a compiled CSS file with a bunch of duplicate ```@media``` queries. Whether or not this is a dealbreaker is something each developer needs to decide on his or her own. My **opinion** is that writing media queries in this manner is more than well justified by the time saved and frustration avoided.