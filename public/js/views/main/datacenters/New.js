/*global define*/
define(
  ['marionette','vent','tpl!templates/main/datacenter/new.tmpl','models/DataCenter'],
  function (Marionette, vent, tmpl, DataCenter) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'tr-container container',
      events: {
        'change [name]'       : 'updateModel',
        'submit #setup-form'  : 'verify'
      },
      initialize: function() {
        this.model = new DataCenter();
        Backbone.Validation.bind(this);
      },
      updateModel: function(ev) {
        this.model.set($(ev.currentTarget).attr('name'), $(ev.currentTarget).val());
        this.model.checkPasswords();
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
          console.log('Failed validation');
          console.log(this.model.get('valid'));
          return false;
        }

        vent.trigger('route:remove', 'setup');

        console.log('good!');
        $(this.el).find('#datacenter-form').submit();
      }
    });
  }
);

