---
title: Happy Birthday, Mike!
permalink: /happy-birthday/2016
redirect_from:
- /happy-birthday/
- /happy-birthday

layout: default
layout_options:
  fullscreen: true
  hero: true
  hide_footer: true
  hide_page_title: true
image: /assets/images/birthday/hero.jpg
stylesheets:
  - /assets/styles/birthday.css
---

{% assign entries = site.birthdays | where: "year", "2016" %}

<div class="birthday-hero">
  {%
    include lazy-image.html
      src = "/assets/images/birthday/hero.jpg"
      width = "100%"
      height = "100%"
      background_size = "cover"
      background_position = "50% 75%"
  %}
</div>

{% for entry in entries %}

  {% capture section_class %}
    {% if entry.background_color %}
      birthday-entry--{{ entry.background_color }}
    {% endif %}
  {% endcapture %}

  <div class="birthday-entry {{ section_class | strip }}">

    <div class="row center-xs">
      <div class="col-xs-12 col-sm-8 col-md-6 has-text-left">

        <p><strong>From:</strong> {{ entry.person }}</p>

        {{ entry.content }}

        {% if entry.image %}
          {% assign aspect_ratio = entry.image.height | times: 1.0 | divided_by: entry.image.width %}
          {%
            include figure.html
              src = entry.image.src
              aspect_ratio = aspect_ratio
              background_size = "contain"
          %}
        {% endif %}

      </div>
    </div>
  </div>

{% endfor %}

<div class="container">
  <div class="row center-xs">
    <div class="footer__content col-xs-12">
      <div class="rule"></div>
      All content on this page belongs to the original authors.
    </div>
  </div>
</div>
