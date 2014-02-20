---
layout: article
title: "Syncing Sublime Text settings via Github"
category: thoughts
excerpt: I recently started using Github (rather than Dropbox) to sync my Sublime Text settings. This is why (and how).
---
Since the dawn of time (since I started using Sublime Text) I've been using Dropbox to backup my settings, via symlinks, and keep them in sync across computers. This works well enough, especially because of Dropbox's inherent “instant-ness”. Update a setting or install a package at work, get the new change later that evening at home. Cool.

There is, however, an annoying bug which I encountered along the way: updated preferences or newly installed packages would not take effect until after a full Sublime Text restart. If you start using the Google Machine to investigate, you quickly realize that this is something a [lot](http://www.sublimetext.com/forum/viewtopic.php?f=3&t=13976) [of](http://stackoverflow.com/questions/17852901/sublime-text-requires-restart-on-settings-changes-to-take-effect) [people](http://www.sublimetext.com/forum/viewtopic.php?f=3&t=14209) run into. Finally, I got fed up and decided to just move everything into a Github repository. I was already doing this with my custom snippets, so I figured it would make sense to have all the settings in the same place.

Here's how to do this if you're…

## Migrating from Dropbox

## Syncing a new installation or adding a computer