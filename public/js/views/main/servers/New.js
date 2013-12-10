/*global define*/
define(
  ['marionette','vent','tpl!templates/main/servers/new.tmpl','models/Server'],
  function (Marionette, vent, tmpl, Server) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'container',
      events: {
        'change [name]'        : 'updateModel',
        'submit #server-form'  : 'verify'
      },
      initialize: function() {
        $(window).on('resize.newserver', _.bind(this.resize, this));
      
        this.model = new Server();
        Backbone.Validation.bind(this);
      },
      onClose: function() {
        $(window).off('resize.newserver');
      },
      onShow: function() {
        this.resize();
      },
      updateModel: function(ev) {
        this.model.set($(ev.currentTarget).attr('name'), $(ev.currentTarget).val());
        this.doValidate();
      },
      doValidate: function() {
        this.model.set('valid', this.model.validate());
        this.render();
      },
      verify: function() {
        // Verify the form is filled out correctly.
        if (!this.model.isValid()) {
          this.doValidate();
          return false;
        }

        $(this.el).find('#server-form').submit();
      },
      resize: function() {
        $(this.el).height($('body').height() - 51);
      }
    });
  }
);

