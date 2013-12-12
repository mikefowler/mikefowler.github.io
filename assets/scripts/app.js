/*global app*/

(function(app, $) {

  'use strict';

  app.supports = {};

  app.init = function() {

    app.$window = $(window);
    app.$body = $('body');
    app.$masthead = $('.js-masthead');
    app.$navlist = $('.js-navlist');
    app.$toggleNav = $('.js-toggle-nav');
    app.$socialIcons = $('.js-social-icons');

    app.mastheadHeight = app.$masthead.height();
    app.scroll = 1;

    // Make sure all external links open in a new context
    externalLinks();

    // Collapse the header when we scroll down, but only
    // if our masthead is fixed.
    collapseMasthead();

    // If we have browser support for it, and if size of
    // the window is wide enough for it to make sense,
    // then enhance the social icons.
    if (app.$socialIcons && 
        Modernizr.cssfilters && 
        Modernizr.csstransitions && 
        Modernizr.cssanimations &&
        Modernizr.touch !== true &&
        app.$body.width() > 960) {
      app.$socialIcons.addClass('about--fancy');
    }

  };

  function collapseMasthead () {
    var mastheadToggleClass = 'masthead--collapsed';

    // On any scroll event...
    app.$window.on('scroll', function () {
      
      var offset = app.$window.scrollTop()
        , fixedHeader = (app.$masthead.css('position') === 'fixed' ? true : false)
        , direction = (app.scroll > offset ? 'up' : 'down')
      
      // After we check the scroll direction, update the stored scroll offset
      app.scroll = offset;

      // If:
      //    1) the header is fixed
      //    2) we've scrolled past the top of the page
      //    3) we're scrolling DOWN the page
      // Then:
      //      
      if (fixedHeader && offset > 0 && direction === 'down') {
        app.$masthead.addClass(mastheadToggleClass);
      }

      // Otherwise remove the class, uncollapsing the masthead
      else {
        app.$masthead.removeClass(mastheadToggleClass);
      }
    });

    // Uncollapse the masthead when we click on the nav toggle icon
    app.$toggleNav.on('click', function () {
      app.$masthead.removeClass(mastheadToggleClass);
    });

  }

  function externalLinks () {
    $('a').each(function () {
      var a = new RegExp('/' + window.location.host + '/');
      if (!a.test(this.href)) {
        $(this).click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          window.open(this.href, '_blank');
        });
      }
    });
  }

}(window.App = window.App || {}, $));

// Go, go go!
$(function() {
  App.init();
});