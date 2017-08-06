---
title: An Irrevocable Condition
subtitle: Essays and field recordings, exploring the idea of home, travel, and happiness.
permalink: /an-irrevocable-condition/
redirect_from:
  - /podcast
  - /audio

layout: default
layout_options:
  fullscreen: true
  hero: true
  hide_page_title: true
image: /assets/images/podcast/cover.jpg
stylesheets:
  - /assets/styles/podcast.css
javascripts:
  - /assets/js/podcast.bundle.js
---

{% assign episodes = site.podcasts | sort: 'date' | reverse %}

{% capture podcast_links %}
<ul class="link-list">
  <li class="link-list__item">
    <a href="{{ site.podcast.itunes_link }}" target="_blank">iTunes</a>
  </li>
  <li class="link-list__item">
    <a href="{{ site.podcast.pocketcasts_link }}" target="_blank">Pocket Casts</a>
  </li>
  <li class="link-list__item">
    <a href="{{ site.podcast.stitcher_link }}" target="_blank">Stitcher</a>
  </li>
</ul>
{% endcapture %}

<div class="podcast-hero">
  <div class="podcast-hero__image">
    {%
      include lazy-image.html
        src = "/assets/images/podcast/hero.jpg"
        width = "100%"
        height = "100%"
        background_size = "cover"
    %}
  </div>
  <h1 class="podcast-hero__title">{{ page.title }}</h1>
  <div class="rule rule--light"></div>
  <h2 class="podcast-hero__subtitle">{{ page.subtitle }}</h2>
  <div class="podcast-hero__subscribe">
    <span>{% include icon.html type="rss" size="14" %} Subscribe via:&nbsp;</span>
    {{ podcast_links }}
  </div>
</div>

<div class="podcast-container container">
  <div class="row center-xs">
    <div class="col-xs-12 col-sm-8 col-md-8">
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
