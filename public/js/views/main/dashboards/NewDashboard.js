/*global define*/
define(
  ['marionette','vent','tpl!templates/main/newdashboard.tmpl'],
  function (Marionette, vent, newdashboard) {
    'use strict';

    return Marionette.ItemView.extend({
      template: newdashboard,
      initialize: function() {
      	//$(window).on('resize.profile', _.bind(this.resize, this));
      },
      onClose: function() {
		    //$(window).off('resize.profile');
      },
      onShow: function() {
        $(this.el).find('[data-toggle="tooltip"]').tooltip();
        //this.resize();
      },
      resize: function() {
      }
    });
  }
);

