---
title: "Resolving pretty URLs with Backbone (like Soundcloud!)"
excerpt: "Using Backbone Models to resolve “pretty” resource URLs into RESTful resource URLs"
keywords: Backbone.Model, API permalinks
redirect_from:
  - /2014/03/24/resolving-pretty-urls-with-backbone/
  - /thoughts/resolving-pretty-urls-with-backbone/
---
Recently I've been working on implementing “clean” URLs in a Backbone app where our backing API doesn't support direct querying of resources by their slugs.  Why no slug querying? A matter of opinion, but the philosophy goes that a REST API should be stateless and largely unaware of what the data it provides is used for. A resource slug, on the other hand, is largely implementation-dependent. For example, your web application might leverage them but a native iOS app disregard them altogether.

So, what's the alternative? Instead, the backing API implements a `GET /resolve` endpoint similar (read: the same) to the one present in [Soundcloud's API](http://developers.soundcloud.com/docs/api/reference#resolve). The endpoint accepts a single parameter, `url`, containing an HTTP link to a “pretty” resource in the app. For example, you might call `GET http://api.app.com/resolve?url=http://app.com/mike`. The API response is a `302 Moved Temporarily` with an accompanying `Location` header containing the direct path to the RESTful resource in the API.

Given these constraints, the question is: how do we use Backbone to query these resources? My solution, one based heavily on what I deduced that Soundcloud does, and one that I've recently implemented in an application at work, is to implement a static “resolve” method on my Backbone models. Let's look at some examples.

Let's say that we hit a route in our application for a “user” resource. Our router might be set up like this:

```js
App.Router = Backbone.Router.extend({
  routes: {
    ':username': 'user'
  },
  user: function (username) {
    // What goes here? Let's figure it out.
  }
});
```

In our router method, we want to:

1. Look up our user model using the provided username
2. Render our view, like a user's profile, into the page, using the fetched model

We'll modify our router method to read something like this (continued from above):

```js
user: function (username) {
  App.User.resolve(username).then(function (user) {
    App.$el.html(new App.ProfileView({
      model: user  
    }).render());
  });
}
```

Things that we now know, based on the above:

1. Our `User` model has a static method called `resolve` that accepts a parameter, the username, and it returns a Promise object, provided in this case by jQuery.
2. When the Promise is resolved, it passes back one parameter, `user`, which is an instantiated Backbone model containing the data fetched from the API.
3. We then pass `user`, our model, into a new `ProfileView` and render it into our page, `App.$el`, in this case.

So… what does the `resolve` method look like? Let's take a look at that.

```js
App.User = Backbone.Model.extend({

  // Instance methods…

}, {

  resolve: function (username) {
    var promise = new $.Deferred()
      , url = 'http://api.app.com/resolve?url=http://app.com/' + username;

    $.getJSON(url).then(function (response) {
      var user = new App.User(response);
      promise.resolve(user);
    });

    return promise;
  }

});
```

Our `User.resolve` static method first creates a new Deferred object that we can resolve upon successfully fetching the model. We build a query URL using the provided `username` argument, and pass that into a `$.getJSON` call. Upon a successful response we create a new `User` model and resolve the promise, passing back the new model. The function returns the promise so that our router method above may also wait for the promise to be resolved.

## Enhancements

I intentionally cut out some extra cruft in the code samples for this article to show only the *gist* of the concept here. In all likelihood, there are additional complexities and enhancements you'll want to make to suit your app.

### Reusing models

If your app implements any sort of model store, whether something custom or provided by a module like [backbone-relational](https://github.com/PaulUithol/Backbone-relational), you have the option, in your `resolve` method, of checking to see whether the resource in question has already been stored locally. For example, I might modify my method above to read something like this:

```js
resolve: function (username) {
  var promise = new $.Deferred()
    , user = App.User.find({ username: username });

  if (user) {
    promise.resolve(user);
  } else {
    // If the model isn't in the store, proceed
    // with the $.getJSON call like above
  }

  return promise;
}
```

Before executing the `$.getJSON` call, we first use a model method to look up existing instances of a `User` model where the username is `username`. If the model exists locally, resolve the promise immediately, passing back the model we've found. Otherwise, continue as before. Here, `App.User.find` would be replaced by your implementation of a model store, whatever it might be.

### Abstracting the resolve method

You may wish to further abstract the static `resolve` method to reduce duplicate code across models. For instance, we might implement a second `resolve` method in a base model:

```js
App.Model = Backbone.Model.extend({

  // Instance methods…

}, {

  _resolve: function (Model, path, matchParams) {
    var promise = new $.Deferred()
      , model = Model.find(matchParams)
      , url;

    if (model) {
      promise.resolve(model);
    } else {
      url = 'http://api.app.com/resolve?url=http://app.com/' + path;
      $.getJSON(url).then(function (response) {
        model = new Model(response);
        promise.resolve(model);
      });
    }

    return promise;
  }

});

App.User = App.Model.extend({

  // Instance methods…

}, {

  resolve: function (username) {
    return App.Model._resolve(this, username, { username: username });
  }

});

App.Note = App.Model.extend({

  // Instance methods…

}, {

  resolve: function (username, slug) {
    return App.Model._resolve(this, username + '/notes/' + slug, {
      author: username,
      slug: slug
    });
  }

});
```

Now, each resource model needs only to call into the base `_resolve` method and pass the path of the “pretty” resource, and the parameters to use when looking up existing models.

### Constructing dynamic resolve URLs

In your actual implementation, you might want to construct the URLs that you pass to `$.getJSON` dynamically. For instance, modify the base model above

```js
_resolve: function (...) {
  var apiHost = App.config.API_HOST // e.g. "http://api.app.com"

  // ...

  var url = apiHost + '/resolve?url=' + (apiHost + path).replace(/^https?:\/\/api\./, '');

  // ...
}
```
