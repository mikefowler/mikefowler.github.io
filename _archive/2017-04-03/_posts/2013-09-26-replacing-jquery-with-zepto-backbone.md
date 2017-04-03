---
layout: article
title: Replacing jQuery with Zepto in your Backbone project
category: thoughts
excerpt: If you're developing an application for the mobile web and you're using jQuery, you can (and should) probably swap it out for Zepto.
keywords: zepto, jquery, backbone, backbone.js, require.js
---

### Because honestly, if you're working on an app that specifically targets mobile, you have no reason not to.

You probably know by now that jQuery 2.0 came out back in April, finally dropping support for legacy IE8 and older browsers, and introducing a much-needed build tool to pull out the pieces of the library that you never use. A great milestone for the jQuery team. Still, Zepto is built for and *targets* the mobile web, and includes support for a few browsers that you might normally glance over (hey there, Amazon Silk).

I'm using RequireJS for file loading, so the code on this page reflects that. For those of you not using RequireJS or another file loader, doing a straight replace of jQuery for Zepto should do just fine, as both use the familiar ```$``` alias. For those of you using Require, it's going to look something like this. Because I'm using the [AMD version of Backbone](https://github.com/amdjs/backbone), I'm aliasing the path to Zepto as “jquery”, since Backbone specifically ```require```'s the “jquery” module.

```js
require.config({
  paths: {
    jquery: 'vendor/zepto/zepto.min'
  }
})
```

At this point, you'll reload your app and potentially find some wacky things going on. Specifically, the vanilla build of Zepto does not include a ```data()``` method for storing objects in memory. If you inspect your page and see a bunch of DOM elements with data attributes of value “[object Object]”, you're going to need to create a custom build that includes the data module. The [Zepto Github page](https://github.com/madrobby/zepto) has documenation on how to create custom builds, and while you're there, check out the other available modules, some of which may be able to replace 3rd-party jQuery plugins you were already using: touch, swipe and gesture.

### Things to watch out for

Even beyond creating a custom build of Zepto to account for some missing pieces, there are still some bits of functionality you might find you're missing.

#### $.Deferred

Absent entirely is any sort of deferred functionality, a handy bit of AJAX magic when you're writing a Backbone app that might be making multiple simultaneous requests to an API. Luckily, there are plenty of drop-in alternatives to jQuery's implementation. In my project I was able to painlessly switch to [Simply Deferred](https://github.com/sudhirj/simply-deferred), a vanilla solution with plugin support for Zepto. After adding Simply Deferred as a dependency in your RequireJS configuration, attaching it to Zepto is painless (again, leave out the RequireJS syntax here if you don't need it):

```js
require(['jquery', 'deferred'], ($, Deferred) {
  
  Deferred.installInto( $ );

});
```

#### Omitted DOM methods

Notably, jQuery's ```outerWidth()``` & ```outerHeight()``` methods are missing. If you're making use of these anywhere you can extend ```$.fn``` with your own implementations or one of the several Gists linked from [the corresponding issue](https://github.com/madrobby/zepto/issues/618) in Zepto's repository.

#### CSS selector support

For doing things like ```$('body').is(':visible')``` or ```$('.article:first')```. This shouldn't be **too** big of an issue, because you can create a custom build that includes the optional “selector” module which provides [limited support](https://github.com/madrobby/zepto/blob/master/src/selector.js#L24) of some commonly used selectors. Refer to the section above for creating a custom build.
