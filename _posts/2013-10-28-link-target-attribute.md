---
title: The anchor “target” attribute
excerpt: Did you know that the "target" attribute of the anchor tag accepts more than just preset keywords like "_blank"? If you too have been kept in the dark, allow me to share my delightful new discovery.
redirect_from:
  - /2013/10/28/link-target-attribute/
  - /thoughts/link-target-attribute/
---
One of the first bits of HTML I remember learning is the anchor tag, and along with it the ```target``` attribute. Because let's get real: if you wanted to put a link in your Myspace profile, this was *crucial* knowledge, and what's more is that you wanted that link to open in a new window. No *way* am I letting this link pull people away from my handcrafted, artisinal social network profile, just oozing with pertinent personal information and the A-to-Z of my taste in film, music and books.

So ```target="_blank"``` was a familiar snippet of code from early on. And what else would you use that attribute for? Nothing. That was it.

Thus my delight when recently I was turned onto the other purpose for this attribute. Disclaimer: I legitimately have zero clue whether this is something I just missed in my years learning HTML, or if this is just something the web community in general has unconsciously excluded from their knowledge. To be fair, it's a rather minor implementation detail, so this really isn't some prophetic realization.

Let's say I want to link to my Twitter profile and I want it to open in a new tab. Easy.

```html
<a href="http://twitter.com/michaelrfowler" target="_blank">@michaelrfowler</a>
```

Thing is, if the internet user clicking on my link clicks on it twice, whether intentionally or on accident, the result is two different tabs with my Twitter page open on it. Annoying. Well, as I've recently learned, the ```target``` attribute actually accepts several predefined keywords, like "_blank", **or any valid browsing context name**. In other words: any string that will represent a new browsing context. How about this instead:

```html
<a href="http://twitter.com/michaelrfowler" target="mike-on-twitter">@michaelrfowler</a>
```

Now when the savvy internet citizen clicks on my link, their browser will only ever open a single instance of my Twitter profile. Click on it ten times in succession: a single tab only. Fantastic.

Relevant spec: [http://www.w3.org/TR/html5/browsers.html#valid-browsing-context-name-or-keyword](http://www.w3.org/TR/html5/browsers.html#valid-browsing-context-name-or-keyword)
