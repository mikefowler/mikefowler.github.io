---
layout: article
title: Generating static styleguides with Grunt and KSS
category: thoughts
excerpt: If you're familiar with the concept of CSS styleguides, you're probably also familiar with KSS, a neato TomDoc-inspired methodology for documenting your stylesheets written by Githubber Kyle Kneath.
---
If you're familiar with the concept of CSS styleguides, you're probably also familiar with [KSS](http://warpspire.com/kss/), a neato TomDoc-inspired methodology for documenting your stylesheets written by Githubber [Kyle Kneath](http://warpspire.com/). I've been familiar with the project since it was first released, and I mentioned it in [my Vermont Code Camp presentation]({% post_url 2012-09-22-crafting-scalable-stylesheets %}) last year. Half a year back I had started to implement the documentation in our stylesheets at [Findery](http://www.findery.com) via a Rails engine gem. When it worked, the generated documentation was looking great, but I consistently ran into issues with the engine and my efforts were backburnered for understandably more important tasks.

Jump to present and enter onto the stage Grunt, which I've been using consistently and obsessively for all of my projects the past few months for everything from automatically building icon fonts to code quality testing to file optimization. Huge props to Google's [Yeoman](http://yeoman.io) project for introducing me and the development community at large to the massive potential of Grunt.

Recently I was made aware of a need to revive our styleguide, so I began revising the documentation I'd started back at the beginning of 2013 and simultaneously looking for a better solution for generating the styleguide itself. I looked first to Grunt and was delighted to immediately find a well documented module that supported the KSS syntax, [grunt-styleguide](https://github.com/indieisaconcept/grunt-styleguide). The generator runs on top of [kss-node](https://github.com/hughsk/kss-node), a NodeJS port of Kyle's Ruby gem.

My setup
--------

The Grunt module is well documented, but I thought I'd post my current setup.

``` javascript
grunt.initConfig({

  // ...

  styleguide: {
    options: {
      template: {
        src: 'vendor/styleguide'
      },
      framework: {
        name: 'kss'
      }
    },
    all: {
      files: [{
        'public/styleguide': 'app/assets/stylesheets/**/*.scss'
      }]
    }
  },

  // ...

});
```

Note here that the paths are totally up to you, this is just how I currently have it set up within our Rails environment. Here's a brief overview of the task settings:

* **styleguide.options.template.src:** the NPM module for the task includes a default template for the KSS framework. It's essentially just a folder of files that get copied over to your output destination and then slightly modified. I copied the default template out of the Node module into our own place so we can modify it without feeling dirty by changing files in a version-controlled NPM module.
* **styleguide.options.framework.name:** we're specifying that we want to use the KSS engine, rather than the default styledocco.
* **styleguide.all.files:** standard practice for most Grunt tasks, here we're specifying the files that the task should operate on. The key, 'public/styleguide', is the path where the built styleguide will be put, and 'app/assets/stylesheets/\*\*/\*.scss' specifies that any *.scss file in 'app/assets/stylesheets' should be used as a source file.

There are some additional options documented on the project's Github page, including an option to automatically compile (if necessary) and include your project's main stylesheet in the styleguide. Unfortunately, that option didn't seem to be working for me, so I ended up just modifying the HTML template to include a link to our main stylesheet.

The front page of the styleguide — which in our case it would live at /styleguide/index.html — is automatically generated from a Markdown file that you create in the same directory as your stylesheets. Currently I'm using this front page to document examples of our more general typographic elements that don't make as much sense to document inline in a stylesheet: paragraphs, headings, lists, etc.

**Rails note:** I added 'public/styleguide' to our ```.gitignore``` file since we don't actually want to serve the pages. Individual developers can run the Grunt task locally, and ideally set up a Grunt watch task to automatically regenerate the styleguide when your stylesheets change.