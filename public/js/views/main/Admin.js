/*global define*/
define(
  ['marionette','vent','tpl!templates/main/admin.tmpl'],
  function (Marionette, vent, admin) {
    'use strict';

    return Marionette.ItemView.extend({
      template: admin,
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

