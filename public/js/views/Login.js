/*global define*/
define(
  ['marionette','vent','tpl!templates/login.tmpl','models/Login'],
  function (Marionette, vent, tmpl, Login) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'tr-container container',
      events: {
        'change [name]'      : 'updateModel',
        'submit #login-form' : 'verify'
      },
      initialize: function() {
        this.model = new Login();
        Backbone.Validation.bind(this);
      },
      updateModel: function(ev) {
        this.model.set($(ev.currentTarget).attr('name'), $(ev.currentTarget).val());
        this.doValidate();
      },
      doValidate: function() {
        debugger;
        this.model.set('valid', this.model.validate());
        this.render();
      },
      verify: function() {
        // Verify the form is filled out correctly.
        console.log('WHAT?');
        if (!this.model.isValid()) {
          this.doValidate();
          return false;
        }

        $(this.el).find('#login-form').submit();
      }
    });
  }
);

