---
title: Home
layout: page
homepage: true
layout_options:
  container: false
  hide_page_title: true
---

<div class="container space-top-4">
  <div class="row center-xs">
    <div class="col-xs-12 col-sm-10 col-md-8">
      <a href="{% link pages/location.md %}">
        {%
          include locations.html
            limit = 1
            caption_position = "after"
        %}
      </a>
    </div>
  </div>
</div>
