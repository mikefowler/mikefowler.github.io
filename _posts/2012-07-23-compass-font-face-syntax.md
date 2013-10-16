---
layout: article
title: Font-face syntax in Compass
category: thoughts
excerpt: Since the documentation on the Compass website is a tad confusing I thought I'd clarify the basic usage of the @font-face mixin included in Compass.
keywords: compass, sass, @font-face, font-face, css
---
Since the documentation on the Compass website is a tad confusing I thought I'd clarify the basic usage of the @font-face mixin included in Compass.

If you're using Font Squirrel or any other web font creation tools, you should have a stack of font files with different file types for each font you need to load: .woff, .ttf, .svg and .eot. Drop these into the ```fonts``` directory for your Compass project (by default it's a folder called 'fonts' inside the compiled CSS directory, like '/css/fonts'). Once these files are in the correct place, the syntax is as follows:

``` sass
// Import the Compass Font Face module
@import "compass/css3/font-face";

// Define our font
@include font-face('My Font Name', 
  font-files(
    'fontName.woff', woff,
    'fontName.ttf', ttf,
    'fontName.svg', svg),
    'fontName.eot');
```

After importing the Compass module, the first thing we do is name our font. The string value can be set to your liking, and will be used in your font stack declarations. The font-files() array then defines the names of the included files, with an _unquoted_ indication of its file type. Note that the *.eot file is a standalone string outside the font-files() array and is used only by IE.

Our custom 'My Font Name' font is now available to use just like any other in a font stack declaration. However, since we're using Sass and Compass, we should go ahead and make this DRY and create an @extend-able selector. If you're using Sass 3.2.x you can use a @extend placeholder, or just use a regular class to extend if you're still using the stable version.

``` sass
%myfont {
  font-family: 'My Font Name', sans-serif;
}

h1 {
  @extend %myfont;
}
```

