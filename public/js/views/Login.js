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
        if (this.submit) {
          this.doValidate();
        }
      },
      doValidate: function() {
        this.model.set('valid', this.model.validate());
        this.render();
      },
      verify: function() {
        // Verify the form is filled out correctly.
        this.submit = true;
        if (!this.model.isValid()) {
          this.doValidate();
          return false;
        }

        $(this.el).find('#login-form').submit();
      }
    });
  }
);

