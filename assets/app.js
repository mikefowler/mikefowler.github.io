(function(global) {

  var app;

  function App() {
    this.el = {};

    this.detectFeatures();
    this.bindElements();
    this.initMaps();
  }

  App.prototype.bindElements = function() {
    this.el = {
      maps: document.querySelectorAll('.js-map'),
    };
  };

  App.prototype.detectFeatures = function() {
    var hasTouchSupport = 'ontouchstart' in window;

    if (!hasTouchSupport) {
      document.documentElement.classList.add('no-touch');
    }
  };

  App.prototype.initMaps = function() {
    var numberOfMaps = this.el.maps.length;

    if (numberOfMaps) {
      var i, el, map, latitude, longitude;

      for (i = 0; i < numberOfMaps; ++i) {
        el = this.el.maps[i];
        latitude = parseFloat(el.getAttribute('data-latitude'));
        longitude = parseFloat(el.getAttribute('data-longitude'));

        if (!latitude || !longitude) return;

        new mapboxgl.Map({
          container: el,
          style: 'mapbox://styles/mapbox/light-v9',
          center: [longitude, latitude],
          zoom: 14,
          interactive: false,
        });
      }
    }
  };

  global.addEventListener('DOMContentLoaded', function() {
    app = new App();
  });

})(window);
