---
title: "Coffeescript source maps with Yeoman"
excerpt: Getting Coffeescript source maps working with Yeoman's directory structure.
date: 2013-10-28 15:41
redirect_from:
  - /2013/10/28/coffeescript-source-maps-with-yeoman/
  - /thoughts/coffeescript-source-maps-with-yeoman/
---
If you're using Yeoman as a base for any of your projects, chances are good that there is stock support for Coffeescript through [grunt-contrib-coffee](https://github.com/gruntjs/grunt-contrib-coffee). So… if you're writing Coffeescript for your project, this is convenient. But you know what else is great? grunt-contrib-coffee also supports generation of Coffeescript source maps. The glory! BUT. It takes some finagling.

The first thing you need to do is add an option to the Coffeescript task, directing it to generate source maps:

```js
// ...
coffee: {
  dist: {
    options: {
      sourceMap: true
    }
  }
},
// ...
```

By default, the Coffeescript task compiles from the source directory, ```app/scripts```, into the Yeoman ```.tmp``` directory. The resulting JavaScript files are accompanied by a “.map” file of the same name, a JSON file that specifies the necessary information to map ```main.coffee```, for example, to ```main.js```. In that map file are two keys, “sourceRoot” and “sources”, which collectively point your web browser to the correct source file on disk.

If we let this task run again now, everything will run fine but we'll notice that the mappings don't work when you attempt to debug in browser. The problem lies in the “sourceRoot” property in the map file. This is a side effect of the Yeoman directory structure, where ```.tmp``` and ```app``` exist as sibling folders. Since the source maps are generated from the Coffeescript files *before* they are moved to the ```.tmp``` directory, the “sourceRoot” property is going to read something like “../app/scripts”, for example. The problem here is that, in the web server that Yeoman spins up for you, the mounted folder *is* the ```app``` directory, so the generated relative path is invalid.

Here's what we can do.

Instead of compiling the Coffeescript files from their original source location, we'll copy all of them over into the ```.tmp``` directory first, and *then* compile them to JavaScript. We'll add a new target to the copy task in our Gruntfile that looks like this:

```js
copy: {
  coffee: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>/scripts',
      dest: '.tmp/scripts',
      src: '**/*.coffee'
    }]
  },
  dist: {
    // ...
  }
}
```

Then, in every task that runs the “coffee” task, we'll run “copy:coffee” just before it. Note that there are probably a few places where you will need to insert this additional copy task. Just look for instances of “coffee:dist”.

```js
grunt.task.run([
  // ...
  'copy:coffee',
  'coffee:dist',
  // ...
]);
```

We also have to change our Coffeescript task to compile from the ```.tmp``` directory instead:

```js
coffee: {
  dist: {
    options: {
      sourceMap: true
    },
    files: [{
      expand: true,
      cwd: '.tmp/scripts',
      src: '**/*.coffee',
      dest: '.tmp/scripts',
      ext: '.js'
    }]
  },
  // ...
}
```

With that change we're pretty much set. There are a couple of additional small changes that you should make. In the portion of the “watch” task that watches Coffeescript files, we want to run the same combination of copy and compile tasks:

```js
watch: {
  coffee: {
    files: ['<%= yeoman.app %>/scripts/**/*.coffee'],
    tasks: ['copy:coffee', 'coffee:dist']
  },
  // ...
}
```

Lastly, we want to find any references to the standalone “copy” task and change them to be more specific: “copy:dist”. Where initially there was only one target in the “copy” task, we added one above, and we can prevent Grunt from doing more work than it needs to do by being more specific here.

Now, when you look at the “.map” file that accompanies each JavaScript file in the ```.tmp``` directory, you'll see that the “sourceRoot” property is empty, or, in other words, the source file is in the same directory as the mapped file. Since Yeoman mounts the ```.tmp``` directory when it boots up the web server, Chrome (or source-map supporting browser of choice) should now be able to properly locate the source files.

Happy sourcemapping, all.
