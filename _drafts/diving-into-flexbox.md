---
layout: article
title: "Diving into Flexbox"
category: thoughts
---

## Or: a deep-dive into the Flexbox spec in an attempt to understand both the *how* and the *why* of the Flexible Box Layout syntax.

Now that the updated flexbox spec is finally approaching candidate recommendation status, I'm putting forth my first honest effort at fully understanding how everything works. The little bits that I've been exposed to up to now have left me more confused than before, and my only real understanding of the spec is conceptual. Any code I've written has largely been copied from a tutorial with the *how* and *why* of the syntax taken for granted. So let's start from the top.

## Why Flexbox?

If you frequently write CSS for laying out complex web applications, the need for better layout tools is apparent. That's the short of the "why Flexbox?" question. The editors of the spec have been very specific about the intended use of flexbox, stating right in the Abstract that:

> The specification describes a CSS box model optimized for user interface design.

*"But what about floats and inline blocks? They work fine for layout".* True, we've been using those constructs for laying out interfaces for years, but nowhere in those respective specs will you see a specific reference to an intended use of interface design like I've just quoted above. So, in an ironic way of stating it, Flexbox is going to provide layout tools in CSS that are *intended* for layout.