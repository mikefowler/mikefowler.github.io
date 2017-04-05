---
title: "Handlebars template helpers in Backbone.Marionette"
excerpt: "Backbone.Marionette has an incredibly helpful feature: being able to define View-specific template helpers right in the view. Unfortunately, they don't work with Handlebars out of the box. Let's change that."
redirect_from:
  - /2014/02/20/template-helpers-handlebars-backbone-marionette/
  - /thoughts/template-helpers-handlebars-backbone-marionette/
---
This is a super specific article topic, but I wasn't able to find a simple solution after looking around for a while, so here's what I worked out.

[Backbone.Marionette](http://marionettejs.com/) allows you to define an object in your view called `templateHelpers`. The keys of this object turn into helper names that you can then use in your template:

```js
Backbone.Marionette.ItemView.extend({

    title: 'My Page',

    templateHelpers: {
        title: function () {
            return this.title;
        }
    }

});
```

This is **so** helpful for using View attributes in a template, especially when you're working with a View that isn't backed by a model. So, given the above, I want to be able to have my template read: <code>\<h1\>\{\{ title \}\}\</h1\></code>.

Unfortunately, if you compile this and view it, you'll just see this:

```html
<h1>function() { return this.title; }</h1>
```

Since this feature was written with Underscore.js templates in mind, the expectation is that the entire function gets passed into the template and then you call the method directly from the template. Not possible with Handlebars. So let's modify the Marionette method!

The method in question is part of Backbone.Marionette.ItemView and is called `mixinTemplateHelpers`. We're going to override the whole thing:

```js
Backbone.Marionette.ItemView.prototype.mixinTemplateHelpers = function (target) {
    var self = this;
    var templateHelpers = Marionette.getOption(self, "templateHelpers");
    var result = {};

    target = target || {};

    if (_.isFunction(templateHelpers)){
        templateHelpers = templateHelpers.call(self);
    }

    // This _.each block is what we're adding
    _.each(templateHelpers, function (helper, index) {
        if (_.isFunction(helper)) {
            result[index] = helper.call(self);
        } else {
            result[index] = helper;
        }
    });

    return _.extend(target, result);
};
```

The original method gets the `templateHelpers` option from the View, evaluates it if it's a function, and extends the target object with the result. Here, we're taking it a step further by looping through each of the defined helpers to check if **it** is a function. If it is, we evaluate it and store the result. Note also that we're storing the evaluated helpers in a separate object, `result`, so that we don't override the original `templateHelpers` object. After that, we extend the target object as in the original method.

Ta-da! View-specific Handlebars helpers in your Backbone.Marionette app.
