/*global define*/
define(
  ['marionette','templates', 'vent'],
  function (Marionette, templates, vent) {
    'use strict';

    return Marionette.ItemView.extend({
      template: templates.header,
      events: {
        'click #admin' : 'admin',
        'click #profile' : 'profile',
        'click #help' : 'help',
        'click #logout' : 'logout'
      },
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
      },
      admin: function() {
        vent.trigger('header:admin');
      },
      profile: function() {
        vent.trigger('header:profile');
      },
      help: function() {
        vent.trigger('header:help');
      },
      logout: function() {
        vent.trigger('header:logout');
      }
    });
  }
);

