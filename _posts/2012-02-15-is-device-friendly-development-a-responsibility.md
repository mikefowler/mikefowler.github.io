---
layout: article
title: "Is device-friendly development a responsibility?"
date: 2012-02-15 10:38
category: thoughts
---
I got to thinking the other day: is developing device-friendly websites a responsibility of the developer? If it's not now, will it ever be?

This is an issue that I think is worth talking about. I'd like to hear some other opinions as I think through this myself. I'll start with some thinking points and then wrap it together at the end.

In the beginning...
-------------------

...there were tables. For the simple reason that tables made it easy to align content in a grid-like fashion, tables become the de-facto method for creating visual layout. Layout via CSS become possible in the late 1990's, but with browser support shoddy at best, it was certainly not the tried and true method that table layout was. And so things were, until the community began more closely considering things like semantics, accessibility and search optimization. As it turned out, the markup you used to create your layout could adversely affect these things. 

Gradually, CSS became more powerful and saw better browser implementation. Fundamentally, this was one of the first large-scale transitions for web developers. Moving to CSS-based layouts meant learning a new scripting language. Thus, we arrive at our first question:

During this transition period, did we, as developers, consider it our duty, our *responsibility*, to inform clients of this transition and push them in the direction of a table-less layout?

Poor browser implementation abound
----------------------------------

Let's jump five to ten years down the road. Microsoft has won the war against Netscape, and Internet Explorer dominates the browser market. Dominate might even be too lenient a description. Check out [this 2003 press release](http://www.onestat.com/html/aboutus_pressbox23.html) from OneStat. This release came near the height of Microsoft's browser dominance and shows Internet Explorer 6 with an astonishing 97.34% of the market share.

While these stats serve to illustrate just how much the market has changed since 2003, I've included them here rather to point out the importance of another massive shift in the industry. The initial release of Mozilla Firefox in 2004 put into motion a shift away from the proprietary browsers released by Microsoft to browsers built on community-developed open source engines, namely Gecko and Webkit.

So, a second rhetorical: In the past five to six years, have developers made it their responsibility to sway clients away from lingering old versions of browsers with poor implementations of CSS and towards modern browsers that provide the user with a richer, immersive experience?

Get to the point, already.
--------------------------

Ok, ok. Let's pull this back around. First some opinions.

While I was only getting started with web development at the tail end of the transition from table layout to CSS layout, I can say with certainty that I would have encouraged clients to go for a table-less layout. On the matter of pushing clients towards modern browsers and encouraging the abandonment of old implementations, I think it's [safe](http://www.ie6countdown.com/) [to](http://www.ie6death.com/) [say](http://code.google.com/chrome/chromeframe/) that I (and the rest of the community) have actively been doing that, even garnering support from Microsoft itself.

Looking back at these two major transitions in the history of web development, I am pointing a huge finger at how our job as developers relates to the technology we promote. Ultimately, our job as developers and designers is create rich, meaningful ways to deliver content that reaches our target audience and can create the best possible experience. For this to happen, we work as a community to push through new specifications and in turn encourage browser vendors to make those specifications a reality.

Over the past two years, developing for mobile devices has moved from an ideal to a requirement, especially for highly visible websites. While initially this requirement took the form of a native application, now more than ever there is a growing number of companies ditching the native application and developing mobile-friendly, browser-based solutions. Some of the more notable companies to achieve this in the past year are the Boston Globe (check out [Zeldman's article](http://www.zeldman.com/2011/09/15/boston-globes-responsive-redesign-discuss/) for more on that) and [Smashing Magazine](http://www.smashingmagazine.com/). There is no doubt that this trend will continue and we will start to see more and more larger companies launching redesigns comfortably viewable on a vast array of devices.

That being said, *where do small companies fall in this trend?* Should we expect the owner of a local restaurant to be aware of and request that their site be responsive and mobile-friendly? Would we have expected similar from clients in the late 1990's when we began moving away from table-based designs? Or even two years ago when the push began to kill off the remaining IE6 user-base? 

It seems to me that as the developers, the people engineering ways to experience content, a certain amount of this responsibility falls to us. If our job, as I feel is the case, is about delivering content in the most efficient and effective manner, then I think we absolutely have a responsibility to encourage clients to move towards mobile-friendly designs.

In practice
-----------

Is anybody doing this yet? I'd love to hear from developers who have already made responsive development a part of their standard client packages, or have at least begun to have that conversation with some of the smaller companies you do work for. Like I said earlier, I think this is a conversation worth having, so please feel free to voice your opinion and get this discussion going.