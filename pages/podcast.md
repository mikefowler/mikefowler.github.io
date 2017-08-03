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
javascripts:
  - /assets/js/podcast.bundle.js
---

{% assign episodes = site.podcasts | sort: 'date' | reverse %}

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

<div class="container">
  <div class="row center-xs">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <div class="podcast-player">
        {% include player.html songs = episodes %}
      </div>
    </div>
  </div>
</div>

<script>
  var MRF = MRF || {};

  MRF.episodes = [
    {% for episode in episodes %}
      {
        name: "{{ episode.title }}",
        artist: "{{ site.author.name }}",
        album: "{{ site.podcast.title }}",
        date: "{{ episode.date }}",
        cover_art_url: "{{ episode.image | absolute_url }}",
        url: "{{ episode.file }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>
