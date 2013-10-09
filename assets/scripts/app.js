/*global app*/

(function(app, $) {

  'use strict';

  app.init = function() {

    app.$window = $(window);

    // Events
    app.$window.on('scroll', scrollEventHandler);

  };

  app.setHeaderHeight = function(scrollOffset) {

    console.log('set the header height based on an offset of ' + scrollOffset);

  };

  function scrollEventHandler(e) {
    
    var offset = app.$window.scrollTop();
    app.setHeaderHeight(offset);

  }

}(window.App = window.App || {}, jQuery));

// Go, go go!
$(function() {
  App.init();
});