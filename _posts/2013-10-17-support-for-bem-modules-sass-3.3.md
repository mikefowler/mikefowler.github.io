---
layout: article
title: "Support for BEM modules in Sass 3.3"
category: thoughts
excerpt: The next major release of Sass is poised for release and with it comes real support for BEM-style modules!
keywords: sass, sass 3.3, @at-root, bem, oocss, smacss, css, stylesheets
---

## The next major release of Sass is poised for release and with it comes real support for BEM-style modules! Celebrate!

If you're not familiar with the concept of BEM, here's a quick overview for you: BEM, or *block, element, modifier*, is a methodology for naming classes in your markup and stylesheets. Specifically, it's a way to use classes to your advantage by visually indicating multi-level hierarchy and modifiers. Lots of [other](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) [people](http://coding.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/) have written about this, and in much more depth, so that's all I'll say here.

Up until this point, writing BEM modules in Sass, while possible, was not as elegant as one might have hoped. Sass's parent selector, ```&``` seemed to be the glimmer of hope that would get us there, but, regrettably, it was only possible to use at the beginning of a compound or descendant selector. Thus, one of our best options until now was using variable interpolation to construct BEM classes:

``` scss
$module: 'note';

.#{$module}__content {
  background: white;
}

.#{$module}__meta {
  background: #f1f1f1;
  border-top: 1px solid #eee;
}

.#{$module}--featured {

  .#{$module}__meta {
    background: pink;
  }

}
```

The great news is that in the next release of Sass (available now by installing the release candidate of the gem via ```gem install sass --pre```) the parent selector has been reworked to support chaining with BEM-style elements and modifiers. Ideally we could write the above in a way that more visually indicated a module, but still allowed us to maintain a flat module. What do I mean by "flat"? In other words, I want my Sass file to visually indicate that a given class, say ```.note__content```, is part of a module, but I don't want it nested as a descendant class like ```.note .note__content```.

Let's give it a shot, using Sass 3.3's reworked parent selector:

``` sass
.note {

  #{&}__content {
    background: white; 
  }

  #{&}__meta {
    background: #f1f1f1;
    border-top: 1px solid #eee;
  }

  #{&}--featured {
    box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);
  }

}
```

Closer! Now we have better visual indication that this block of CSS is a module. *However*... this bit of Sass won't compile to the flat module I mention above, but rather to a series of descendant classes. So... what next? 

## Enter @at-root!

Sass 3.3 introduces a new sort of mixin called ```@at-root```. Content nested inside an ```@at-root``` block will be moved out of whatever hierarchy it's nested in and placed at the "root" of the stylesheet. A bit confusing, but an example makes this more clear:

**Source:**

``` sass
.note {
  
  @at-root {
    
    .note__content {
      background: white;
    }
  
    .note__meta {
      background: #f1f1f1;
      border-top: 1px solid #eee;
    }

    .note--featured {
      box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);
    }

  }

}
```

**Result:**

``` css

.note__content {
  background: white;
}

.note__meta {
  background: #f1f1f1;
  border-top: 1px solid #eee;
}

.note--featured {
  box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);
}

```

We're getting closer, because now we have the flat module *and* the nested visual inheritance in our source. The last step, the one that really pulls all of this together, is that we can mix in the new ability of the parent selector so that we don't have to type out our module name for every class. On top of that, we can wrap the whole thing up into a mixin.

### A Sass 3.3 BEM Module Mixin

``` sass
@mixin module($name) {
  .#{$name} {
    @at-root {
      @content;
    }
  }
}

@include module('note') {

  #{&}__content {
    background: white;
  }

  #{&}__meta {
    background: #f1f1f1;
    border-top: 1px solid #eee;
  }

  #{&}--featured {

    #{&}__meta {
      background: pink;
    }

  } 

}
```

Our little mixin is able to abstract out some of the complexity of the module code itself, and, if you're writing a lot of modules in this way, will keep your Sass stylesheets DRY. I'll be converting a bunch of my project's modules to this format in the coming weeks, and am super excited about this next step for Sass. Keep in mind that there are a [slew of improvements](http://davidwalsh.name/future-sass) coming with Sass 3.3, so keep an eye out for the official release notes.