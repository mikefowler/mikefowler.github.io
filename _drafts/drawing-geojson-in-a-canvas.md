---
layout: article
title: "Drawing GeoJSON in a canvas"
category: thoughts
excerpt: "A simple run loop for drawing GeoJSON into a canvas element"
keywords: geojson, canvas, javascript 
---
I've been working on a utility recently that involves drawing GeoJSON data directly into the page via a `<canvas>` element. The process involves navigating the structure of the GeoJSON data source and drawing directly into the canvas. Everything considered, it's actually a fairly simple process, but it's nice to have it spelled out, so let's take a look: