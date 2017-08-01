---
title: An Irrevocable Condition
permalink: /an-irrevocable-condition
redirect_from:
  - /podcast
  - /audio

layout: default
layout_options:
  fullscreen: true
  hero: true
  hide_footer: true
  hide_page_title: true
image: /assets/images/podcast/hero.jpg
stylesheets:
  - /assets/styles/podcast.css
---

<div class="podcast-hero">
  <div class="podcast-hero__image">
    {%
      include lazy-image.html
        src = page.image
        width = "100%"
        height = "100%"
        background_size = "cover"
    %}
  </div>
  <h1 class="podcast-hero__title">{{ page.title }}</h1>
</div>
