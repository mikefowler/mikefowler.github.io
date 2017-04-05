---
title: "Drawing with GeoJSON"
excerpt: "A simple overview of how to draw GeoJSON into HTML Canvas"
keywords: geojson, canvas, javascript
redirect_from:
  - /2014/06/10/drawing-geojson-in-a-canvas/
  - /thoughts/drawing-geojson-in-a-canvas/
---
GeoJSON, as defined by its spec, is “a format for encoding a variety of geographic data structures”. Vague, certainly. In layperson's terms, GeoJSON defines a format for storing data you might find on a map: a point (latitude/longitude), a line between two points, a polygonal shape, etc. The specification has been around since 2008 but didn't appear on my radar until the past half year, notably when Github started supporting [rendering GeoJSON files](https://help.github.com/articles/mapping-geojson-files-on-github) in repositories.

Last month I started experimenting with taking GeoJSON data, readily available thanks to the very active GIS community and public domain datasets like [Natural Earth](http://www.naturalearthdata.com/), and… well… *doing* something with it. Projects like D3 and Leaflet support GeoJSON natively, but I was more interested in how I would go about drawing GeoJSON without a weighty client library. The exploration that followed was my first dive into map math and coordinate projections, and my rudimentary learnings I present to you here.

## The basics of map projections

GeoJSON, by definition, encodes geographic features as one or more “positions”. A point is one position, whereas a shape, like a country, is an array of positions that form a polygon. In the case of the data provided by Natural Earth, these “positions” are references to geographic coordinates: latitude and longitude in the form of a two element array: `[longitude, latitude]`.

Drawing a map, in theory, is as simple as drawing these positions directly into a canvas, like plotting points on a graph. Rarely, however, do you see maps that draw coordinates straight onto a map. Why? Without getting overly technical, the answer is simple: the world is a sphere. Maps, however, are usually both 1) one-dimensional, and 2) rectangular. Thus, trying to draw a sphere onto a flat surface results in distortion, increasingly so closer to the poles.

*Enter: map projections!* Projections are a way of transforming latitude and longitude in order to map the surface of a sphere on to a flat surface. Map projections are [numerous and varied](http://xkcd.com/977/). In the context of programming, you can think of projections as functions:

```js
function project (longitude, latitude) {
  return {
        x: longitude, // Transform “longitude” in some way
        y: latitude // Transform “latitude” in some way
    }
}
```

## Understanding the data structure

GeoJSON objects usually come in the form of a [Feature Collection](http://geojson.org/geojson-spec.html#feature-collection-objects). Multiple objects, our points, polygons and other geographic features, are all contained in the “features” key of this collection:

```json
{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
            [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
            ]
        }
    },{
        // ...
    }]
}
```

## Obtaining a bounding box

The process of turning this data into something we can *visualize*, then, involves a lot of looping. In order to draw this data into a `<canvas>` we first need to know the *bounding box* of the data we're working with. The bounding box is necessary to fit the width and height of the map data to the width and height of our drawing area. A simple function might look like this:

```js
function getBoundingBox (data) {
  var bounds = {}, coords, point, latitude, longitude;

  // We want to use the “features” key of the FeatureCollection (see above)
  data = data.features;

  // Loop through each “feature”
  for (var i = 0; i < data.length; i++) {

    // Pull out the coordinates of this feature
    coords = data[i].geometry.coordinates[0];

    // For each individual coordinate in this feature's coordinates…
    for (var j = 0; j < coords.length; j++) {

      longitude = coords[j][0];
      latitude = coords[j][1];

      // Update the bounds recursively by comparing the current
      // xMin/xMax and yMin/yMax with the coordinate
      // we're currently checking
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    }

  }

  // Returns an object that contains the bounds of this GeoJSON
  // data. The keys of this object describe a box formed by the
  // northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
  return bounds;
}
```

For a map of the world ([like this GeoJSON dataset, for instance](https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json)), the bounding box might return something similar to this:

```js
var box = getBoundingBox(data);

// {
//   xMin: -180,
//   xMax: 180,
//   yMin: -90,
//   yMax: 83.5
// }     
}
```

## Drawing our data

With our bounding box obtained, we can now draw our map. We need to know the specific width and height of the map we'll be drawing. Together with the bounding box, the width and height are used to “scale” the points of our data to fit within the appropriate ranges. Our draw method will look very similar to the method we wrote above for obtaining the bounding box except instead of updating the limits of a bounding box we're drawing directly into a `<canvas>` element.

```js
var canvas = document.createElement('canvas');

function draw (width, height, bounds, data) {
  var context, coords, point, latitude, longitude, xScale, yScale, scale;

  // Get the drawing context from our <canvas> and
  // set the fill to determine what color our map will be.
  context = canvas.getContext('2d');
  context.fillStyle = '#333';

  // Determine how much to scale our coordinates by
  xScale = width / Math.abs(bounds.xMax - bounds.xMin);
  yScale = height / Math.abs(bounds.yMax - bounds.yMin);
  scale = xScale < yScale ? xScale : yScale;

  // Again, we want to use the “features” key of
  // the FeatureCollection
  data = data.features;

  // Loop over the features…
  for (var i = 0; i < data.length; i++) {

    // …pulling out the coordinates…
    coords = data[i].geometry.coordinates[0];

    // …and for each coordinate…
    for (var j = 0; j < coords.length; j++) {

      longitude = coords[j][0];
      latitude = coords[j][1];

      // Scale the points of the coordinate
      // to fit inside our bounding box
      point = {
          x: (longitude - bounds.xMin) * scale,
          y: (bounds.yMax - latitude) * scale
      };

      // If this is the first coordinate in a shape, start a new path
      if (j === 0) {
        this.context.beginPath();
        this.context.moveTo(point.x, point.y);

      // Otherwise just keep drawing
      } else {
        this.context.lineTo(point.x, point.y);
      }
    }

    // Fill the path we just finished drawing with color
    this.context.fill();
  }
}
```

## Projecting our map coordinates

So with the two functions above we can effectively take a GeoJSON FeatureCollection and draw it into an HTML Canvas element, but we're missing a key component, one we discussed above: a map projection. Remember earlier I mentioned that you can think of map projections as methods? That's because, very literally, they are. We're going to use the [Mercator projection](http://en.wikipedia.org/wiki/Mercator_projection), one of the most common map projections and also what Google Maps and Mapbox use.

```js
function mercator (longitude, latitude) {
  var radius = 6378137;
  var max = 85.0511287798;
  var radians = Math.PI / 180;
  var point = {};

  point.x = radius * longitude * radians;
  point.y = Math.max(Math.min(max, latitude), -max) * radians;
  point.y = radius * Math.log(Math.tan((Math.PI / 4) + (point.y / 2)));

  return point;
}
```

The Mercator projection takes a geographic coordinate, (longitude, latitude), and returns an (x, y) point. The resulting point describes a location in meters, so the components of the point we get back are much larger than the longitude and latitude that we pass in. With this projection available to us, we need to modify our function above.

In our “draw” function where we define “point”, rather than using the longitude and latitude as obtained from the GeoJSON, we're going to “project” that coordinate first, and use the resulting (x, y) point instead. It'll now look like this:

```js
longitude = coords[j][0];
latitude = coords[j][1];
point = mercator(longitude, latitude);

// Scale the points of the coordinate
// to fit inside our bounding box
point = {
  x: (point.x - bounds.xMin) * scale,
  y: (bounds.yMax - point.y) * scale
};
```

With this in place, we're now successfully drawing our GeoJSON data source onto a flat surface using the Mercator projection!

## smallworld.js

I was so taken with my learning experience that I decided to write a small utility. The result is [smallworld.js](http://mikefowler.me/smallworld.js), a small utility for drawing small maps of the world. It allows you to easily generate map overviews and plot markers on them, efficiently and without dependencies on any outside client libraries. It also has a small wrapper for use with jQuery or Zepto. Check out the [main class](https://github.com/mikefowler/smallworld.js/blob/master/src/smallworld.js) to see all of the concepts here in action, including the added functionality of specifiying zoom levels and placing markers on your projected map.

## TL;DR

I made a little utility for drawing small maps with GeoJSON and `<canvas>`. [Check it out.](http://mikefowler.me/smallworld.js).
