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
        router,
        home;
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

      $(document).on('click', 'a[href="#"]', function(e) {
        //e.stopImmediatePropagation();
        //return false;
      });

      hash = window.location.hash;
      $.get('/api/settings', function(b) {
        if (b) {
          app.main.show(new Wizard());
        }
        else {
          $.ajax({
            error: function(jqxhr, status, error) {
              app.main.show(new Login());
            },
            success: function(data, status, jqxhr) {
              router = new (Backbone.Marionette.AppRouter.extend({
                "routes": {
                  "about": "about",
                  "home":  function() {
                    console.log('HELLO');
                    home = new Home();
                    app.main.show(home);
                    home.content.show(new Content());
                  },
                  "admin" : "admin",
                  "config/:id": function(id) {
                  
                  },
                  "compare/:id" : function(id) {

                  },
                  "configs" : function() {

                  },
                  "profile": function() {
                    app.main.show(new Profile({user: user}));
                  }
                }
              }))();

              router.navigate(hash || '#home', { 'trigger': true });
            },
            type: 'POST',
            url: '/api/check'
          });

        }
      });
    });

    app.on('initialize:after', function(options) {
      Backbone.history.start();
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
