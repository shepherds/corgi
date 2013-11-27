/*global $*/
define(
  [
    'backbone','marionette','vent','text!pj',
    'views/Login', 'views/Wizard', 'views/main/Admin', 'views/main/Content', 'views/nav/Navbar'
  ],
  function (
    Backbone, Marionette, vent, pj, Login, Wizard, Admin, Content, Navbar
  ) {
    'use strict';

    pj = JSON.parse(pj);

    var hash,
        router;
    var app = new Marionette.Application();

    app.addRegions({
      navbar: '#navbar',
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
          'home' : _.wrap(function home() {
              app.main.show(new Content());
              changeNav('dashboards');
            }, auth
          ),
          'servers' : _.wrap(function servers() {
              app.main.show(new Content());
              changeNav('servers');
            }, auth
          ),
          'services' : _.wrap(function services() {
              app.main.show(new Content());
              changeNav('services');
            }, auth
          ),
          'datacenters' : _.wrap(function datacenters() {
              app.main.show(new Content());
              changeNav('data-centers');
            }, auth
          ),
          'profile' : _.wrap(function profile() {
              app.main.show(new Content());
              changeNav('profile');
            }, auth
          ),
          'admin' : _.wrap(function home() {
              app.main.show(new Admin());
              changeNav('admin');
            }, auth
          )
        }
      }))();

      $.get('/api/settings', function(b) {
        if (!b) {
          app.main.show(new Wizard());
        }
        else {
          app.navbar.show(new Navbar());
          if (hash.length === 0) {
            router.navigate('#/home', {trigger: true});
          }
        }
      });
    });

    function auth(func) {
      $.ajax({
        error: function(jqxhr, status, error) {
          console.log('login');
          app.main.show(new Login());
        },
        success: function(data, status, jqxhr) {
          func();
        },
        type: 'POST',
        url: 'api/check'
      });
    }

    app.on('initialize:after', function(options) {
      Backbone.history.start();
    });

    vent.on('route:remove', function(name) {
      delete router.routes[name];
    });

    vent.on('content:new', function(error) {
      //home.content.show(new views.newdashboard());
    });

    function changeNav(id) {
      $('.sunken-menu-item').removeClass('selected');
      $('.item-' + id).addClass('selected');        
    }

    return app;
  }
);
