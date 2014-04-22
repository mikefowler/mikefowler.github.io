---
layout: article
title: "Cached images and the “load” event"
category: thoughts
---
A quick bit here, but one that I spent enough time digging into that I feel is
worth posting.

Last week, working in a Backbone app, I was writing a view that displayed an
image. When the view first renders, the container where the image will be
displayed is hidden, and a spinner shows in its place. The image, meanwhile, is
preloaded by the view in JavaScript, and when it's ready, a class is added and 
the image fades in. Walla!

The code looked something like this:

```javascript
{
   
  //...
   
  renderImage: function () {
    var $image = $('.js-image');
    
    $image.on('load', function () {
      $image.addClass('visible');
    });
  },
   
  // ...
   
}
```

Pretty straightforward.

I noticed shortly thereafter that, since *I was working with a one-page app*, a
subsequent visit to the same page would fail to load and display the image.
Strange. Some digging and then…

**Aha! Image caching!** I had realized that caching was probably at play, but what
I did *not* know about was the fact that the `load` event only ever fires once
for an image. Once that image is loaded and cached by the browser, that event
will never automatically fire again, even if the DOM element itself has been
destroyed and inserted again into the page.

Here's the magic (read: feels hacky) bits to get this working the way I
wanted:

```javascript
{
   
  //...
   
  renderImage: function () {
    var $image = $('.js-image');
    
    $image.on('load', function () {
      $image.addClass('visible');
    });
    
    if ($image[0].complete) {
      $image.load();
    }
  },
   
  // ...
   
}
```

The above is identical to the function at the top, save for the `if`
statement. If the image element has the `complete` property set,
we need to manually trigger a load event on the image. That way, if the image
has been cached, we call `.load()` and the `.on('load', function () {})` call
above runs like normal.