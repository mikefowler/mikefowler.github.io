---
layout: article
title: "An early look at CSS3 Conditional Rules"
date: 2012-08-21 08:38
category: thoughts
---
In a [recent episode of Shop Talk Show](http://shoptalkshow.com/episodes/029-with-tab-atkins/), Tab Atkins briefly mentioned a draft of a spec that includes feature querying in CSS. The feature, ```@supports```, is part of the "[CSS Conditional Rules](http://dev.w3.org/csswg/css3-conditional/)" module, and while the working draft has existed since September of 2011, it was my first time hearing about this proposal. Bear in mind, nothing about this spec is even close to final, and the editors draft specifically mentions that the ```@supports``` rule is at risk.

The ```@supports``` rule will allow us to test whether a user's browser supports a given CSS 'property: value' pair. The use of ```@supports``` is similar to the way that we currently pass a block of content into the ```@media``` rule to be executed only if the proper conditions are met. In addition to being able to test for a positive result (the browser DOES support the given "property:value" pair), we will also be able to test if a given "property: value" pair is NOT supported by the browser.

Current state of feature detection
----------------------------------

Presently, a lot of us are using Modernizr to handle any CSS feature detection we may need to do. The amount of functionality covered in the Modernizr test suite is now so comprehensive that, for me at least, it has become the de facto library if I need to test for a feature. The production build tool they provide makes it painless to create your library initially and then add additional tests later. To facilitate using feature detects in stylesheets, Modernizr adds classes to the root ```html``` tag indicating support (like ```class="touch"```) or the lack thereof (such as ```class="no-touch"```).

A major difference here is that Modernizr also adds test results to an object in the global JS namespace. While there isn't much practical use for executing JavaScript based on the support of a CSS property, this functionality is crucial if you want to load JS-based polyfill libraries based on the **lack** of support for a CSS property. I don't know enough about spec writing to know if a spec like this one implies a JavaScript counterpart (document.supports?), but obviously we would not be able to load polyfills with CSS-based feature detecting alone, and sometimes fallback rules just aren't enough.

@Supports in action (theoretically)
------------------------------------------

Before reading these examples, note again that this spec is in flux, and furthermore **no browsers have implemented this**. These examples are pulled from the current version of the editor's draft, linked above. In our example, let us say we are testing support for flexbox. We want to specify some rules to apply if the browser supports the property, but we also want to be able to specify fallbacks in case the user agent does **not** support flexbox.

``` css

/**
 * Set our main sections to use flexbox
 * if the browser supports it.
 */

@supports ( display: flexbox ) {

  body,
  #navigation,
  #content {
    display: flexbox;
  }

}

/**
 * Fall back to a compatible layout if
 * the user agent does not support flexbox.
 */

@supports not ( display: flexbox ) {

  body {
    width: 100%;
    height: 100%;
  }

  #navigation {
    width: 25%;
  }

  #article {
    width: 75%;
  }

}

```

Pretty straightforward. We would also (theoretically) be able to chain tests like we can with the ```@media rule``` using the ```and``` and ```or``` keywords:

``` css

@supports ( box-shadow: 2px 2px 2px black ) or
          ( -moz-box-shadow: 2px 2px 2px black ) or
          ( -webkit-box-shadow: 2px 2px 2px black ) or
          ( -o-box-shadow: 2px 2px 2px black ) {

  .shadowbox {
    -webkit-box-shadow: 0 0 5px -2px black;
       -moz-box-shadow: 0 0 5px -2px black;
         -o-box-shadow: 0 0 5px -2px black;
            box-shadow: 0 0 5px -2px black;

  }

}

```

Preprocessor implementation
---------------------------

I couldn't write this post without mentioning how elegant this functionality might be implemented in Sass or Compass. The ```box-shadow``` example above is illustrative, but as a developer who has been writing nothing but Sass and Compass for the past year, it feels exceptionally repetitive.

How about something like this?

``` scss

/**
 * This would compile to the code in
 * the previous example.
 */

@include supports( box-shadow ) {

  .shadowbox {
    @include box-shadow(0 0 5px -2px black);
  }

}

```

Lovely. That's what I thought. The practicality of adding ```@supports``` (or something very similar to it) to browsers is obvious, so let us hope that this draft continues to be developed and we see an implementation somewhere down the line.