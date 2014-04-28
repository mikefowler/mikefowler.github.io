---
layout: article
title: "Page Transitions in Backbone"
category: thoughts
excerpt: Implementing page transitions in Backbone can seem non-trivial given the overall lack of opinion that Backbone provides. Here's an opinionated way to implement transitions by adding/removing CSS classes and leveraging CSS transitions.
---
While page transitions aren't typically something you think of in the context of the web, this changes the first time you work on a webapp where the goal is a *native* feel. The precedent set by native apps on iOS and Android devices all but mandate a user experience that includes smooth transitions. With regard to animations and adding/removing elements from the DOM, Backbone gives almost zero opinions. The documentation refers only to using a view's render method to append content to the view itself, and makes no reference to the concept of a “global” application view.

So, while it is opinionated and not without limitations, here is just *one* way of implementing page transitions in a Backbone application.

## The Code

In implementing page transitions, we want to be able to navigate from one route to another and have the current view transition out while the next view transitions in. Backbone View's have a native method, ```.remove()```, that “removes a view from the DOM, and calls stopListening to remove any bound events that the view has listenTo'd”. We'll want to call this, but only once a view has successfully transitioned out. 

In our app we have a router and an “app” view which handles adding & removing all other views from the DOM. In our router, rather than appending new views directly to the DOM, we're going to call a method in our app view, ```.goto()```, passing in an instance of the new view to display.

``` javascript
app.Router = Backbone.Router.extend({
  
  routes: {
    'activity': 'activity',
    '': 'home'
  },

  activity: function () {
    var view = new app.Views.Activity();
    app.instance.goto(view);
  },

  home: function () {
    var view = new app.Views.Home();
    app.instance.goto(view);
  }

});
```

Simple stuff here. ```app.instance``` is a reference to our instance of the main app view, and the important part is letting that main view handle anything related to the DOM. The router is doing its job by essentially saying, “Ok, we hit this route, which corresponds to this view. HEY APP! Here's a reference to the next view, make the magic happen!” So what is the app view doing with the reference to the new view? Let's check it out:

``` javascript
app.Views.App = app.Extensions.View.extend({
  
  // ...

  goto: function (view) {

    var previous = this.currentPage || null;
    var next = view;

    if (previous) {
      previous.transitionOut(function () {
        previous.remove();
      });
    }

    next.render({ page: true });
    this.$el.append( next.$el );
    next.transitionIn();
    this.currentPage = next;

  },
  
  // ...  

});
```

Our app view's ```.goto()``` method takes a single parameter: the new view to display. When we enter the method, the first thing we do is define the “previous”, or what is still the *current*, view, as well as the “next” view, the one we've passed in. Then, if we'd previously stored a reference to the current page, we call ```.transitionOut()```, a method which takes a callback to run upon completion. When the callback runs, we call the native ```.remove()``` method, removing the view from the DOM.

At the same time, we render the next view to display, and append it to our app view's main element. Note here that we're **appending** the new view and not *replacing* the current view. Also note that we're passing an option to the ```.render()``` method, indicating that this view is a “page” (more on that in a minute). After the new view has been appended, we call ```.transitionIn()``` and update the main app view's ```currentPage``` property.

The last piece that we need for this to make sense are the transition methods on the views. These methods are a part of *all* of our views thanks to our own base view. While there are varied ways to achieve this, the method I'm demonstrating here involves adding or removing classes to a view which in turn trigger transitions defined in our stylesheet. Here's a look at the relevant parts of our base view:

``` javascript
app.Extensions.View = Backbone.View.extend({
  
  // ...

  transitionIn: function (callback) {

    var view = this;

    var animateIn = function () {
      view.$el.addClass('is-visible');
      view.$el.one('transitionend', function () {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    };

    _.delay(animateIn, 20);

  },

  transitionOut: function (callback) {

    var view = this;

    view.$el.removeClass('is-visible');
    view.$el.one('transitionend', function () {
      if (_.isFunction(callback)) {
        callback();
      }
    });

  },

  render: function (options) {

    options = options || {};

    if (options.page === true) {
      this.$el.addClass('page');
    }

    // ...

    return this;

  },

  // ...

});
```

For the ```.transitionIn()``` method, we're adding a class, ```is-visible```, to the view, and then waiting to hear a ```transitionend``` event, indicating that a CSS transition has completed. Once we hear that event, we trigger our callback. We delay this whole operation by 20 milliseconds to account for a well known issue with triggering CSS transitions on elements that have just been inserted into the DOM. For the ```.transitionOut()``` method we do the same thing except we *remove* the class we added before, and we do it without the slight delay.

Additionally, in our base ```.render()``` method, we add a class called “page” to view's that we're rendering as pages. So what's the CSS for this look like?

``` css
.page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: transition 0.5s ease;
  transform: translate3d(100%, 0, 0);
}

.page.is-visible {
  transform: translate3d(0, 0, 0);
}
```

Pretty simple, right? By default a ```.page``` element is effectively hidden by translating it 100% (its full width) on the X-axis. When we render the view into existence, the ```.is-visible``` class takes over and sets the translation back to zero. The CSS transition we've defined makes that translation animate, and suddenly we have a page transition.

## Demo

Since there are a bunch of working pieces going on here, I wrote a barebones example application with the bare minimum to implement what I've written about here.

[Awesome, show me the demo.](/labs/backbone-page-transitions)

This demo is also available [as a CodePen](http://codepen.io/mikefowler/pen/Aiyfj) for your forking and experimentation pleasure.

## Additional Notes

In trying to keep the code for this demo at a bare minimum, I left out some things that you'd probably want to add in a production-ready implementation. For example:

* The transitionIn method could take into account whether or not there's a view on the page already. If there isn't, we probably don't need to transition it in but could just set it in place immediately (like on the initial page load, for example).
* Additionally, the ```transitionIn``` and ```transitionOut``` methods don't need to run if the user's browser doesn't support CSS transitions or transforms. If the support isn't there, just add or remove the appropriate class and run the callbacks immediately instead of waiting for the ```transitionend``` event.
* If you want to support a wider range of browsers, you'll need to add vendor prefixes for the CSS transitions & transforms, as well as the ```transitionend``` event. Reference the *Can I Use* stats for [transitions](http://caniuse.com/#search=transition) and [transforms](http://caniuse.com/#search=transform), and the MDN reference for the [transitionend event](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/transitionend).