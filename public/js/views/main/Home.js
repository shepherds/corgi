/*global define*/
define(
  ['marionette','vent','tpl!templates/main/home.tmpl'],
  function (Marionette, vent, home) {
    'use strict';

    return Marionette.Layout.extend({
      template: home,
      regions: {
        content: '#content'
      },
      events: {
        'click #admin' : 'admin'
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
        // TODO
      },
      admin: function() {

      }
    });
  }
);

