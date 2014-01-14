---
layout: article
title: "JavaScript in your Terminal"
category: thoughts
excerpt: "Sometimes you just need to test a piece of JavaScript, ya dig?"
keywords: nodejs, javascript, terminal, devtools
---
I've noticed recently that, while working heavily in NodeJS, I often want to evaluate a snippet of JavaScript without having to run it in my app and verify its output via a log. Usually this wouldn't impede my workflow because I'd have my browser DevTools open and could just run it there. Working in Node, though, I don't usually have DevTools, or even a browser, open.

**Terminal to the rescue!** You have two options here, both exceptionally easy.

1. With NodeJS:

   ```bash
   node
   ```

   Running NodeJS without the optional argument for a filename drops you into a Node shell, and any JavaScript you type and run here will be executed.

2. Without NodeJS (using JSC):

   If you're running OSX, there's a JavaScript command-line interpreter included by default: JSC. Run it from the command line like this:

   ```bash
   /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Resources/jsc
   ```

   To make this a bit easier like in the NodeJS example above, create an alias in your `~/.bash_profile`:

   ```bash
   alias js="/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Resources/jsc"
   ```