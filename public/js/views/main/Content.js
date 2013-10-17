/*global define*/
define(
  ['marionette','templates', 'vent'],
  function (Marionette, templates, vent) {
    'use strict';

    return Marionette.ItemView.extend({
      template: templates.content,
      initialize: function() {
      	//$(window).on('resize.profile', _.bind(this.resize, this));
      },
      onClose: function() {
		    //$(window).off('resize.profile');
      },
      onShow: function() {
        //this.resize();
      },
      resize: function() {
      }
    });
  }
);

