/*global $*/
define(
  [
    'backbone','marionette','vent','text!pj',
    'views/Login', 'views/Wizard', 'views/main/Admin', 'views/main/admin/Users', 'views/main/Servers', 'views/main/Dashboards', 'views/main/DataCenters', 'views/nav/Navbar'
  ],
  function (
    Backbone, Marionette, vent, pj, Login, Wizard, Admin, Users, Servers, Dashboards, DataCenters, Navbar
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
          'dashboards' : _.wrap(function home() {
              app.main.show(new Dashboards());
              changeNav('home');
            }, auth
          ),
          'servers' : _.wrap(function servers() {
              app.main.show(new Servers());
              changeNav('servers');
            }, auth
          ),
          'services' : _.wrap(function services() {
              app.main.show(new Content());
              changeNav('services');
            }, auth
          ),
          'datacenters' : _.wrap(function datacenters() {
              app.main.show(new DataCenters());
              changeNav('data-centers');
            }, auth
          ),
          'profile' : _.wrap(function profile() {
              app.main.show(new Content());
              changeNav('profile');
            }, auth
          ),
          'admin/:page' : _.wrap(function admin(page) {
              console.log('Page: ' + page);
              console.log((page === 'users'));
              debugger;
              app.main.show(new Admin());
              if (page === 'users') {
                app.main.currentView.content.show(new Users());
              }
              else if (page === 'extensions') {
                app.main.currentView.content.show(new Users());
              }
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
            router.navigate('#/dashboards', {trigger: true});
          }
        }
      });
    });

    function auth(func) {
      var args = Array.prototype.slice.call(arguments, 1);
      console.log(args);
      $.ajax({
        error: function(jqxhr, status, error) {
          console.log('login');
          app.main.show(new Login());
        },
        success: function(data, status, jqxhr) {
          func.apply(this, args);
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
