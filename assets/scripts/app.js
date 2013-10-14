/*global app*/

(function(app, $) {

  'use strict';

  app.supports = {};

  app.init = function() {

    app.$window = $(window);
    app.$body = $('body');
    app.$socialIcons = $('.js-social-icons');

    // Run feature detects
    detectFeatures();

    if (app.$socialIcons && 
        app.supports.filters && 
        app.supports.transitions && 
        app.supports.animations &&
       !app.supports.touch &&
        app.$body.width() > 960) {
      app.$socialIcons.addClass('about--fancy');
    }

  };

  function detectFeatures() {

    var el;

    // Filters
    el = document.createElement('div');
    el.style.cssText = '-webkit-filter:blur(2px); filter:blur(2px);';
    app.supports.filters = !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));

    // Transitions
    el = app.$body[0].style;
    app.supports.transitions = el.transition !== undefined || el.WebkitTransition !== undefined || el.MozTransition !== undefined || el.MsTransition !== undefined || el.OTransition !== undefined;

    // Animations
    el = app.$body[0].style;
    app.supports.animations = el.animation !== undefined || el.WebkitAnimation !== undefined || el.MozAnimation !== undefined || el.MsAnimation !== undefined || el.OAnimation !== undefined;

    // Touch
    app.supports.touch = 'ontouchstart' in document.documentElement;

  }

}(window.App = window.App || {}, $));

// Go, go go!
$(function() {
  App.init();
});