---
title: "Backbone with ES6"
keywords: backbone, ecmascript6, es6, es6-module-loader, traceur, modules
excerpt: "Let's make a simple Backbone app to get familiarized with ES6 module and class syntax."
redirect_from: /2014/06/11/backbone-with-es6/
---
For those living under large, flat rocks, some news! The countdown to using ECMAScript 6 in your apps continues, and we're getting closer and closer to that reality. You might have read an article or two (thousand) about neat new language additions, but have you started building with them yet? Well… me neither. Until right now!

This article outlines creating a dead simple Backbone app using several key features of ES6. Yes, Addy Osmani and others have [already done this](http://addyosmani.com/blog/traceur-todomvc/). What I'm going to create in this post is simpler and largely documents my learning experience. Take from it what you will.

## Traceur

As things stand, [no browsers](http://kangax.github.io/compat-table/es6) have natively implemented the ES6 Module or class features. You'll notice in the table linked above, however, that nearly every feature is implemented by something called “Traceur”. Traceur is a compiler released by Google that compiles “JavaScript Next” to JavaScript that can be used today in any browser.

Traceur's compilation can be run both offline or in realtime, in the browser. While not suggested for production sites, we can take advantage of this realtime compilation for purposes of trying things out. To get started, we're going to install a handful of components using Bower and create a basic `index.html` file.

```bash
bower install jquery underscore backbone es6-module-loader
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>Backbone with ES6</title>
</head>
<body>

    <div id="app"></div>

    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/underscore/underscore.js"></script>
    <script src="bower_components/backbone/backbone.js"></script>
    <script src="bower_components/traceur/traceur.js"></script>
    <script src="bower_components/es6-module-loader/dist/es6-module-loader.js"></script>

</body>
</html>
```

From here, things will work similarly to other module loaders you may have used (think Browserify or RequireJS). You'll specify a module to import as your “main” file. Your main file will then handle loading any dependencies it needs (and the dependencies will load *their* dependencies, and so on). Let's create our main file and load it using the ES6 Module Loader. We'll create `app/scripts/main.js` and then add the following below the `<script>` tags we wrote above.

```html
<script>
    System.import('app/scripts/main');
</script>
```

## Classes and module exports

To illustrate the simple use of classes and modules, we're going to do the following:

1. Define a module for our router, which will inherit from Backbone.Router
2. Import the router into our “main” file and create a new instance
3. Start Backbone's history and verify that the default route was triggered
4. Additionally, create several views with templates to render when the route methods are called

Let's create a second file, `app/scripts/router.js`:

```js
class Router extends Backbone.Router {

    constructor () {
        this.routes = {
            '': 'home',
            'resources': 'resources'
        };
        super();
    }

    home () {
        console.log('Router#home was called!');
    }

    resources () {
        console.log('Router#resources was called!');
    }

}

export default Router;
```

For those of you who have written Backbone apps using Coffeescript before, this is going to look pretty familiar. Finally, with ES6, we have a straight JavaScript syntax for writing classes. No more extending Functions with prototype methods!

We set the routes object as a property on the class inside of the constructor, and then call `super()` so that the default Backbone.Router constructor binds the routes properly. For a point of reference, recall that currently, in place of `super()` we would have to write:

```js
// Ooooooof.
Backbone.Router.prototype.constructor.apply(this, arguments)
```

In addition to defining a class, we're “exporting” functionality from this module. In this instance, we're exporting the entire class, setting it as the “default” export. In a bit we'll see the difference between a default export and multiple exports, but for now think of it like exporting either *one* declaration (a variable, object, function or class) or exporting *multiple* declarations by defining exports as properties of an “exports” object.

## Importing modules

Back in our `app/scripts/main.js` file, we can now *import* the functionality we just *exported* above.

```js
import Router from './router';
```

When we import modules in ES6 we *import* the *exports* by name. In this case, since we defined a default export, we can import the entire module and give it a custom name, or “Router”, in this case. Importing by name is demonstrated below.

We'll now expand our main file by creating a class for our application. Inside this class we'll define a constructor which will be responsible for creating an instance of our imported router and starting Backbone's history.

```js
import Router from './router';

class Application {

    constructor () {
        new Router();
        Backbone.history.start();
    }

}

$(() => {
    new Application();
});

```

In addition to the `Application` class, we're also waiting for the DOM to be ready using jQuery (using [ES6 arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions)) and creating a new instance of our `Application` class when it is. If we open our HTML file in browser now, we should see that “Router#home was called!” was successfully logged out to the console. Good start!

## Exporting multiple declarations

Let's add a couple of simple views to our application. We'll add `app/scripts/views.js` and define a couple of classes inside it:

```js
class HomeView extends Backbone.View {

    initialize () {
        this.template = $('script[name="home"]').html();
    }

    render () {
        this.$el.html(_.template(this.template));
        return this;
    }

}

class ResourcesView extends Backbone.View {

    initialize () {
        this.template = $('script[name="resources"]').html();
    }

    render () {
        this.$el.html(_.template(this.template));
        return this;
    }

}

export { HomeView, ResourcesView };
```

These are exceptionally simple views, albeit written in the ES6 class syntax as the router is above. In each case, we're pulling some HTML out of the DOM and setting it as our template, and defining a render method which simply sets the View's `$el` contents to the result of the compiled template.

At the bottom, we're exporting, just like with the router, but this time we're exporting *multiple declarations*. Note how we're wrapping the declarations of our two classes in braces: we're exporting an *object* whose keys represent separate *named* exports. Before we can use these, we need to actually create our templates. We're using Underscore templates here because they're quick and handy. Add these to your `index.html` file, below all of the scripts.

```html
<script type="text/template" name="home">
    <h1>Home</h1>
    <a href="#resources">Go to “Resources”</a>
</script>

<script type="text/template" name="resources">
    <h1>Resources</h1>
    <a href="#">Go to back to “Home”</a>
</script>
```

## Importing named exports

We'll switch back to `app/scripts/router.js` now and import our views. When a route method is called, we'll create a new instance of the appropriate view and render it into the DOM. At the top of the file, import the views we just created:

```js
import { HomeView, ResourcesView } from './views';
```

Remember how I mentioned above that when importing “default” exports we can name the imported module whatever we want? We can do that when importing named exports as well. The above could easily be rewritten like this:

```js
import { HomeView as home, ResourcesView as resources } from './views';
```

I think the names of the exports work just fine as import names here, so we'll leave it as in the first example. Now, in our router methods, we just need to create and render the views.

```js
class Router extends Backbone.Router {

    // constructor

    home () {
        console.log('Route#home was called!');
        var view = new HomeView();
        $('#app').html(view.render().$el);
    }

    resources () {
        console.log('Route#resources was called!');
        var view = new ResourcesView();
        $('#app').html(view.render().$el);
    }

}
```

And that's it! You can check out the completed [demo](http://mikefowler.me/backbone-with-es6) and get the [source code](https://github.com/mikefowler/backbone-with-es6) as well.
