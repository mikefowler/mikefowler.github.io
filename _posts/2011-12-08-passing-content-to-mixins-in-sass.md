---
title: Passing content to mixins in Sass
excerpt: A demo of passing @content blocks into mixins in Sass, and some potential use cases.
keywords: sass, @content, @media, media queries, mixins
redirect_from: /2011/12/08/passing-content-to-mixins-in-sass/
---

Version 3.2 of SASS adds this incredibly helpful piece of functionality: the ability to pass @content blocks to a mixin. What do I mean by passing content to a mixin? We can already pass in parameters, isn't that the same thing? Not quite. Consider the following example, as elegantly illustrated by Chris Eppstein in a Gist from several months ago.

{% gist 1215856 6_media_queries.scss %}

What if we could easily keep our responsive media style rules grouped with the content it defines rules for, but not clutter our file with @media rules? Say, by doing something like this:

```scss
#content {

  width: 960px;

  @include media(tablet) {
    width: 720px;
  }

  @include media(mobile) {
    width: 90%;
  }

}
```

Pretty nice, right? It makes much more sense to keep our media rules inline like this, rather than grouping them into a separate file or section of the document. For small sites it's not too big of a deal, but when you're dealing with stylesheets for larger sites, it's a pain to locate the associated @media rules and make changes in potentially 4 different locations (default, tablet, mobile, wide mobile).

This is exactly what we **can** do with this new release of Sass. Here's what the mixin looks like on the other end:

```scss
@mixin media($type) {

  @if $type == tablet {

    @media only screen and (min-width:768px) and (max-width:991px) {
      @content;
    }

  }
  @else if $type == mobile {

    @media only screen and (max-width:767px) {
      @content;
    }

  }

}
```

Everything looks pretty standard here except for the addition of our new keyword “@content”, which is equal to whatever content you pass into the mixin inside of the curly braces.

Check out the link above for some more examples of how this might be used. I'm especially excited for being able to use this for defining animation keyframes. Unfortunately, for now, Compass doesn't seem to parse this correctly.
