/*global $*/
define(
  [
    'backbone','marionette','vent','text!pj',
    'views/Login', 'views/Wizard', 'views/main/Home', 'views/main/Admin', 'views/main/Content'
  ],
  function (
    Backbone, Marionette, vent, pj, Login, Wizard, Home, Admin, Content
  ) {
    'use strict';

    pj = JSON.parse(pj);

    var hash,
        router;
    var app = new Marionette.Application();

    app.addRegions({
      main: '#main'
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

      hash = window.location.hash;
      router = new (Backbone.Marionette.AppRouter.extend({
        'routes': {
          '' : function() {
            $.get('/api/settings', function(b) {
              if (!b) {
                router.navigate('#/setup');
              }
              else {
                router.navigate('#/login');
              }
            });
          },
          'setup': function() {
            app.main.show(new Wizard());
          },
          'login' : function() {
            console.log('login');
            $.ajax({
              error: function(jqxhr, status, error) {
                app.main.show(new Login());
              },
              success: function(data, status, jqxhr) {
                console.log(router);
                router.route('home', function() {
                  app.main.show(new Home());
                  app.main.currentView.content.show(new Content());
                });

                router.route('admin',  function() {
                  app.main.currentView.content.show(new Admin());
                });

                router.navigate(hash || '#/home', { 'trigger': true });
              },
              type: 'POST',
              url: '/api/check'
            });
          } 
        }
      }))();          
    });

    app.on('initialize:after', function(options) {
      Backbone.history.start();
    });

    vent.on('route:remove', function(name) {
      delete router.routes[name];
    });

    vent.on('nav:admin', function(error) {
      home.content.show(new Admin());
    });

    vent.on('content:new', function(error) {
      //home.content.show(new views.newdashboard());
    });

    return app;
  }
);
