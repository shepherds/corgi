/*global $*/
define(
  [
    'backbone','marionette','router','controller','vent','text!pj',
    'views/Login', 'views/main/Home', 'views/main/Admin', 'views/main/Content'
  ],
  function (
    Backbone, Marionette, Router, Controller, vent, pj, Login, Home, Admin, Content
  ) {
    'use strict';

    pj = JSON.parse(pj);

    var hash,
        router,
        home;
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

      hash = window.location.hash;
      app.main.show(new Login());
    });

    app.on('initialize:after', function(options) {
      router = new Router({ controller: Controller });
      Backbone.history.start();
    });

    vent.on('login:success', function() {
      router.navigate(hash || '#home', { 'trigger': true });
    });

    vent.on('login:failure', function(error) {
      // Show error message
    });

    vent.on('nav:admin', function(error) {
      home.content.show(new Admin());
    });

    vent.on('content:new', function(error) {
      //home.content.show(new views.newdashboard());
    });

    vent.on('route:home', function() {
      home = new Home();
      app.main.show(home);
      home.content.show(new Content());
    });

    return app;
  }
);
