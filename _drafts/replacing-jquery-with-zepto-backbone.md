---
layout: article
title: "Replacing jQuery with Zepto in your Backbone project"
category: thoughts
---

### Because honestly, if you're working on an app that specifically targets mobile, you have no reason not to.

You probably know by now that jQuery 2.0 came out back in April, finally dropping support for legacy IE8 and older browsers, and introducing a much-needed build tool to pull out the pieces of the library that you never use. A great milestone for the jQuery team. Still, Zepto is built for and *targets* the mobile web, and includes support for a few browsers that you might normally glance over (hey there, Amazon Silk).

I'm using RequireJS for file loading, so the code on this page reflects that. For those of you not using RequireJS or another file loader, doing a straight replace of jQuery for Zepto should do just fine, as both use the familiar ```$``` alias. For those of you using Require, it's going to look something like this. Because I'm using the [AMD version of Backbone](https://github.com/amdjs/backbone), I'm aliasing the path to Zepto as "jquery", since Backbone specifically ```require```'s the "jquery" module.

``` javascript
require.config({
  paths: {
    jquery: 'vendor/zepto/zepto.min'
  }
})
```

At this point, you'll reload your app and potentially find some pretty wacky things going on. Specifically, the vanilla build of Zepto does not include a e

### Things to watch out for

- outerWidth & outerHeight