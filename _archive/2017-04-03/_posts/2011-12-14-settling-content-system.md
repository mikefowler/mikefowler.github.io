---
layout: article
title: Settling on a content system
category: thoughts
excerpt: Thoughts on and reasoning behind coding this blog using Octopress.
keywords: octopress, brandon mathis, github pages, jekyll, CMS
---
Around the time that I started developing this site I had started reading more about content systems that would generate static sites (as opposed to a database driven CMS). After a couple days of research I settled on [Stacey](http://www.staceyapp.com), a brilliantly simple PHP-based system that builds pages on the fly using markdown-parsed source files. After familiarizing myself with the templating language I got to work creating my theme and finished that a week or so later. I was fairly happy with the ease of it and how I could exercise my obsessive need for file structure organization. It was easy to include additional stylesheets or javascript on any given page, which I knew I would need for any code demos I wanted to post. 

Despite these things I was irked that there was no good way to categorize posts. I wanted to be able to separate my blog posts from my code experiments and projects. I wanted to be able to have an RSS feed that would only contain two of those three categories. Without a good deal of additional coding, Stacey wasn't going to be able to offer me that. Retrospectively, I see that I should have defined some of those things for myself ahead of time so that I didn't essentially finish building my site and then realize it wasn't quite what I needed.

In any case, something else came along at just the right time. Octopress! The fantastic piece of work by [Brandon Mathis](http://brandonmathis.com/) walks the perfect line between being easy to use with a lot of features out of the box and maintaining a high level of customizability. I was able to maintain everything I loved about Stacey and gain those few extra additional features, and that made it worth learning *another* theme framework literally days before I was going to put the site up.

This is why it's hot
--------------------

- Github Hosting: It's extremely easy to set this up with Octopress, and built in
- A certain amount of automation for creating posts is handled by a Rakefile
- Supports Compass for compiling stylesheets (and why wouldn't it)
- Easy Rake command for compiling site in realtime for development (love this)
- Jekyll + Liquid for templating is gorgeous and dead simple
- Customizable to no end - I basically started a theme from nothing and cherry-picked features from the stock theme
  
Check out Octopress on its [official site](http://octopress.org/) or [fork it on Github](https://github.com/imathis/octopress). For some more thoughts on Octopress, check out [this post over at Divya Manian's site](http://nimbupani.com/redesign-notes.html) (she also just recently launched a redesign running on Octopress).

**Edit:** I have since regressed to plain old Jekyll since the big update came out. I started to become disenchanted with Octopress after realizing that it was a pain to publish a new post unless I was at my laptop with access to Terminal. Plain old Jekyll is my new jam, and if you need a nice writing environment (that you can publish from, no less), [Prose.io](http://prose.io) is so elegant.
