---
layout: article
title: "Reinstating attached view options in Backbone 1.1.0"
category: thoughts
excerpt: "In Backbone 1.1, the options hash you pass into a new View is no longer automatically attached to the view. For those that like this pattern, here's how to reinstate the functionality."
keywords: backbone, backbone.view, backbone 1.1.0, backbone view options, javascript
---

Before version 1.1.0 was released back in October, Backbone had a bit of sugar built into the `Backbone.View` constructor which automatically attached the initialization options to the instance:

```js
var view = new Backbone.View({ title: 'A Backbone View' });

view.options.title === 'A Backbone View'; // TRUE
```

As of 1.1.0, this functionality has been removed after a [huge](https://github.com/jashkenas/backbone/issues/2458) amount of discussion. Here's the most [relevant commit](https://github.com/jashkenas/backbone/commit/51eed189bf4d25877be4acdf51e0a4c6039583c5), which removes the `_configure` method from Backbone.View entirely. Here's the method as it was, where, as mentioned, the difference is that the options are no longer attached to the view:

```css
_configure: function(options) {
  
  // Mixes existing properties of 
  // this.options in with options passed in
  if (this.options) {
    options = _.extend({}, _.result(this, 'options'), options);
  }
  
  // Plucks out “special” properties
  // (like “model”, “collection”, “className”, etc)
  _.extend(this, _.pick(options, viewOptions));
  
  // Attaches all the options to the view
  this.options = options;

}
```

While the primary contributors have decided that this functionality should be eliminated to achieve better consistency with the other Backbone classes, it can easily be added back in. The way to reinstate this functionality is, as with the rest of the Backbone, open to interpretation, and you will find several recommendations in the thread linked above. My implementation (again, a subjective one) is here:

```css
app.View = Backbone.View.extend({
  
  constructor: function (options) {
    this.configure(options || {});
    // ...
    Backbone.View.prototype.constructor.apply(this, arguments);
  },

  configure: function (options) {
    if (this.options) {
      options = _.extend({}, _.result(this, 'options'), options);
    }
    this.options = options;
  }

});
```

In most of my projects I already have a base View class that extends Backbone.View, so it made sense for me to shim the functionality in to my View's constructor. The constructor calls `this.configure`, passing in the options, or an empty object if no options were passed to the constructor. The `configure` method does largely the same thing as the original method above, leaving out the plucking of the “special” options (which Backbone 1.1.0 still does).

Now `this.options.title` your heart out.
