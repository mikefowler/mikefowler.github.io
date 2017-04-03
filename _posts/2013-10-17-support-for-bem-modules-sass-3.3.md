---
title: "Support for BEM modules in Sass 3.3"
excerpt: The next major release of Sass is poised for release and with it comes real support for BEM-style modules!
keywords: sass, sass 3.3, @at-root, bem, oocss, smacss, css, stylesheets
redirect_from: /2013/10/17/support-for-bem-modules-sass-3.3/
---

## The next major release of Sass is poised for release and with it comes real support for BEM-style modules! Celebrate!

If you're not familiar with the concept of BEM, here's a quick overview for you:
BEM, or *block, element, modifier*, is a methodology for naming classes in your
markup and stylesheets. Specifically, it's a way to use classes to your
advantage by visually indicating multi-level hierarchy and modifiers. Lots of
[other](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
[people](http://coding.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/)
have written about this, and in much more depth, so that's all I'll say here.

Up until this point, writing BEM modules in Sass, while possible, was not as
elegant as one might have hoped. Sass's parent selector, ```&``` seemed to be
the glimmer of hope that would get us there, but, regrettably, it was only
possible to use at the beginning of a compound or descendant selector. Thus, one
of our best options until now was using variable interpolation to construct BEM
classes:

```scss
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

> **Update 4/26/14**
>
> Much of this article has been updated to reflect more recent changes in Sass
> that make writing BEM syntax even easier. Thanks to Michael Strutt for
> pointing out the changes in the comments.

The great news is that in Sass 3.3+, the parent selector has been reworked to
support chaining with BEM-style elements and modifiers. Ideally we could write
the above in a way that more visually indicated a module, but still allowed us
to maintain a flat module. What do I mean by “flat”? In other words, I want my
Sass file to visually indicate that a given class, say ```.note__content```, is
part of a module, but I don't want it nested as a descendant class like ```.note
.note__content```.

Using Sass 3.3's reworked parent selector we can write something like this:

```scss
.note {
  color: #ffffff;

  &__content {
    background: white;
  }

  &__meta {
    background: #f1f1f1;
    border-top: 1px solid #eee;
  }

  &--featured {
    box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);
  }

}
```

Ta-da! Now we have great visual indication that this block of CSS is a module,
**and** it compiles as a “flat” module. Here's the result:

```css
.note {
  color: #ffffff;
}

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

## What about blocks nested inside modifiers?

Unfortunately, this doesn't work *perfect* when nesting blocks inside of other
blocks, or blocks inside of modifiers. For example, this:

```scss
.note {

  // By default, our note has a white background…
  &__content {
    background: white;
  }

  // But “featured” notes have an offwhite background
  &--featured {

    &__content {
      background: #eee;
    }

  }

}
```

…compiles to…

```css
.note__content {
  background: white;
}
.note--featured__content {
  background: #eee;
}
```

Not quite what we want. In these cases, defining your module name with a variable
can still be useful. With some simple interpolation:

```scss
$module: 'note';

.#{$module} {

  // By default, our note has a white background…
  &__content {
    background: white;
  }

  // But “featured” notes have an offwhite background
  &--featured {

    .#{$module}__content {
      background: #eee;
    }

  }

}
```

now compiles to:

```css
.note__content {
  background: white;
}
.note--featured .note__content {
  background: #eee;
}
```

## That's it, folks!

The rest of this article [previously discussed](https://github.com/mikefowler/mikefowler.github.io/blob/3ad23f0a7f7e877b21bcdd83a7a36a4b3f27732d/_posts/2013-10-17-support-for-bem-modules-sass-3.3.md)
a new directive, `@at-root`, which allows you to write “nested” selectors which
would ultimately be compiled at the root, and also presented a mixin to
simplify the BEM syntax. As recent changes to Sass have made the use of
`@at-root` and the mixin unnecessary, the rest has been removed. The article
in its original form is linked above.
