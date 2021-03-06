/*global define*/
define(
  ['marionette','vent','tpl!templates/main/datacenters/new.tmpl','models/DataCenter'],
  function (Marionette, vent, tmpl, DataCenter) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'container',
      events: {
        'change [name]'            : 'updateModel',
        'submit #datacenter-form'  : 'verify'
      },
      initialize: function() {
        this.model = new DataCenter();
        Backbone.Validation.bind(this);
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

        $(this.el).find('#datacenter-form').submit();
      }
    });
  }
);

