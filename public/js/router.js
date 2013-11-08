define(
  ['marionette'],
  function(Marionette) {
    'use strict';

    return Marionette.AppRouter.extend({
      appRoutes: {
      	//'authenticated' : 'authenticated',
      	'secure/home' : 'home'
      }
    });
  }
);
