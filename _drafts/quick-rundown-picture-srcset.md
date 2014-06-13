---
layout: article
title: "A quick rundown of &lt;picture&gt; and srcset"
category: thoughts
tags: responsive images, HTML, HTML5, "<picture>", srcset
excerpt: "An overview and example of using the soon-to-be-implemented <picture> element"
---

After a long period of discussion and experimentation with different syntaxes and proposals, it seems that a responsive images solution will ship. Both the [Chromium](https://twitter.com/yoavweiss/status/476951088428777472) and [Firefox](https://twitter.com/Nephyrin/status/476858207164301312) teams have announced potential release targets for turning on the new features, which include a new element, `<picture>`, and additional functionality for the `<img>` element. [Some additional information](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/GRfwz951FHo/I703CR-DZYIJ) regarding intent to ship notes that this will be ported to WebKit, and that the IE team is considering the feature.

If the above holds true, we can expect this functionality available for us to use natively (with a [polyfill](http://scottjehl.github.io/picturefill/) fallback, that is) by late 2014. Given Scott Jehl's thorough polyfill implementation, though, we can start using this now. The information here is drawn from the [official spec](http://picture.responsiveimages.org/).

Rather than do a straight rundown of the spec, I'm presenting use cases and which parts of the spec are useful for the particular case.

## Retina alternatives with “srcset”

As the spec states rather plainly, the `<picture>` element is not intended to be used when there's only a single image, even if there are multiple densities of that image. Given that this is still a common use case, the spec includes additions to the `<img>` tag that enable this functionality, namely the “srcset” attribute. “srcset” allows you to specify a comma-delimited list of image sources and the criteria for which the source should be selected and displayed.

<p class="note">I'll be breaking attributes onto separate lines where appropriate to make reading easier. I don't actually write my HTML like this. Dear god.</p>

**Retina alternative:**

```html
<img 
    src="kitten.jpg" 
    srcset="kitten@2x.jpg 2x" 
    alt="A wittle kitten" 
    width="500" 
    height="250">
```

**Multiple density alternatives:**

```html
<img
    src="kitten.jpg"
    srcset="kitten@2x.jpg 2x, kitten@4x.jpg 4x"
    alt="A wittle kitten"
    width="500"
    height="250">
```

The effect of “srcset” here should be fairly easy to understand. Clients that don't yet support the “srcset” attribute will use “kitten.jpg”. Clients that *do* support the property will use “kitten.jpg” by default, “kitten@2x.jpg” at 2x pixel densities, and “kitten@4x.jpg” at 4x pixel densities.

## Retina alternatives with dynamic image size

The use-case above, while appropriate in many situations, doesn't work as well when the dimensions of an image are dynamic. If we are building a webapp and want an image to take up the full width of the device, it is meaningless to specify “100%” for the image's width and then an alternative for 2x pixel density. If the size of the original image and its retina alternative are 400 and 800, respectively, the retina version is no longer very “retina” if our app is being used on a 1200 pixel wide tablet.

An alternative to the example above allows us to use another new property, “sizes”. Using a standard `<img>` tag, we can provide a “sizes” attribute, specifying what width the image should be displayed at. We then provide a “srcset” attribute as before, but rather than specifying a pixel density at which to display each component we provide a width. The `<img>` tag will then select the appropriate image from the “srcset” collection based on the desired display width of the image (“sizes”) *and* the pixel density of the device.

```html
<img
    src="kitten400.jpg"
    sizes="100vw"
    srcset="kitten400.jpg 400w, kitten800.jpg 800w"
    alt="A wittle kitten">
```