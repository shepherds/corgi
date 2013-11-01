/*global $*/
define(
  [
    'backbone','marionette','router','controller','vent','text!pj','views','templates'
  ],
  function(
    Backbone, Marionette, Router, Controller, vent, pj, views, templates
  ) {
    'use strict';

    pj = JSON.parse(pj);

    var user,
        router,
        home,
        model;
    var app = new Marionette.Application();

    app.addRegions({
      main: '#main',
    });

    app.addInitializer(function(){
      $( document ).ajaxStart( function() {
        $('#ajax-spinner').css( {top: '50%', left: '50%', margin: '-' + ( $('#ajax-spinner').height() / 2 ) + 'px 0 0 -' + ( $('#ajax-spinner').width() / 2 ) + 'px' } );
        $('#ajax-spinner').show();
      }).ajaxStop( function() {
        $('#ajax-spinner').hide();
      }).ajaxError( function(jqxhr, status, error) {
        $('#ajax-spinner').hide();
      });

      $(document).on('click', 'a[href="#"]', function(e) {
        //e.stopImmediatePropagation();
        //return false;
      });

      app.main.show(new views.login());
    });

    app.on('initialize:after', function(options) {
      router = new Router({ controller: Controller });
      Backbone.history.start();
    });

    vent.on('login:success', function(data) {
       initInterface(data);
    });

    vent.on('login:failure', function(error) {
    
    });

    vent.on('header:admin', function(error) {
      home.content.show(new views.admin());
    });

    vent.on('content:new', function(error) {
      home.content.show(new views.newdashboard());
    });

    vent.on('login', function() {
      home = new views.home();
      app.main.show(home);
      home.header.show(new views.header());
      home.content.show(new views.content());
    });

    /*!
     * Initializes the interface.
     */
    function initInterface(u) {
      user = _.clone(u.user, true);

      router.navigate(window.location.hash || '#', { 'trigger': true });
    }

    return app;
  }
);
