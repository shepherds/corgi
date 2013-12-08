/*global define*/
define(
  ['marionette','vent','tpl!templates/main/datacenters.tmpl'],
  function (Marionette, vent, tmpl) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      events: {
        'click .new' : 'newDataCenter'
      },
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
      },
      newDataCenter: function() {
        vent.trigger('datacenter:new');
      }
    });
  }
);

