---
layout: page
permalink: /code/
redirect_from: /thoughts/
---

<ul class="article-list list-unstyled">
{% for post in site.categories.thoughts %}
  <li class="article-list__item">
    <div><a href="{{post.url}}">{{post.title}}</a></div>
    <time class="small" datetime="{{post.date | date: '%Y-%m-%d %H:%M'}}">{{post.date | date: '%m/%d/%Y'}}</time>
  </li>
{% endfor %}
</ul>
