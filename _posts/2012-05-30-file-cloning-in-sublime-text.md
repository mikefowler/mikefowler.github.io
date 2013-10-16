---
layout: article
title: File cloning in Sublime Text
category: thoughts
excerpt: One of the handiest pieces of functionality that many code editors implement is the ability to split, or clone, files into a new tab or window. As one might expect, Sublime Text has this functionality built in, albeit somewhat hidden.
keywords: sublime text, sublime text package, sublime text plugin, sublime text clone file
---
One of the handiest pieces of functionality that many code editors implement is the ability to split, or clone, files into a new tab or window. As one might expect, Sublime Text has this functionality built in, albeit somewhat hidden. The wording of the menu item isn't immediately clear, resulting in my not knowing the feature even existed until I did some digging around.

## Basic Cloning

To clone a file into a new view using Sublime Text 2's default functionality, find `New View into File` in the `File` menu. The result is a new tab in your current group with a second version of the file open. Changes made to the view of either of these files will update the other as well, and saving in one view will save the other. The file has effectively been "cloned".

Unfortunately, I found using this menu item frustrating. Even if you set a keyboard shortcut (there isn't one assigned by default), the file is just cloned into the existing group. Given that the point of cloning a file is to look at two copies side by side, it's a downright pain to break your flow in order to select the menu item (or keyboard shortcut) and then split your layout and drag the file over.

Making Cloning... Better
------------------------

So I wrote a plugin. My first Sublime Text plugin, in fact. I had been looking for an excuse to look over the plugin API anyways, so this seemed like an easy enough utility to get my hands dirty with. _SimpleClone_ makes it much easier to clone files. Effortless, really. The first version of the plugin provides the ability to clone a file to the right (vertical split) and down (horizontal split) with lightning fast keyboard shortcuts.

  * To clone a file to the right, hit **Apple-Shift-Right***
  * To clone a file down, hit **Apple-Shift-Down***

For those using Package Control, you'll find it under 'SimpleClone', or you can [clone the plugin from the Github repo](http://github.com/mikefowler/simple-clone). Browse to your 'Packages' directory in Terminal and run:

``` bash
git clone https://github.com/mikefowler/simple-clone.git
```

<small>*(Windows and Linux users: use Ctrl instead of Apple)</small>

Use Cases for Cloning
---------------------

So, why is file cloning useful anyways? There are obviously a lot of use cases, many of which will be specific to the language or environment you work in, but in my day-to-day tasks, I find it incredibly useful for working with Sass. For smaller sites that do not necessitate their own `_config.scss` partial, I'll keep my section of variables at the top of the file. If you make heavy use of variables as I do, scrolling back and forth to the top of the file to reference variable names can be frustrating. Solution? Clone the file off to the right and keep the section of variables in view while you continue working on the left.

I think this case holds true outside of Sass as well. Cloning is great when you need to quickly reference another part of the file and want to avoid losing your current place in the file.

Feedback on the plugin are welcome in the comments below or via Github.