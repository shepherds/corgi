/*global define*/
define(['vent'], function (vent) {
  'use strict';

  return {
  	authenticated: function() {
  		vent.trigger('login:sucess');
  	},
  	home: function() {
    	vent.trigger('route:home');
    }
  };
});

