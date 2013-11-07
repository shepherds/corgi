/*global define*/
define(['vent'], function (vent) {
  'use strict';

  return {
  	home: function() {
    	vent.trigger('route:home');
    }
  };
});

