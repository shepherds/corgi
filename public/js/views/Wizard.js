/*global define*/
define(
  ['marionette','vent','tpl!templates/wizard.tmpl','models/Wizard'],
  function (Marionette, vent, tmpl, Wizard) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'tr-container container',
      events: {
        'click .mongo-toggle' : 'toggleMongo',
        'change [name]'       : 'updateModel',
        'click #install'      : 'install'
      },
      initialize: function() {
        this.model = new Wizard();
        Backbone.Validation.bind(this);
      },
      onShow: function() {
        $('body').addClass('wizard');
      },
      onClose: function() {
        $('body').removeClass('wizard');
      },
      toggleMongo: function(ev) {
        this.model.set('mongo', $(ev.currentTarget).text());
        this.render();
      },
      updateModel: function(ev) {
        this.model.set($(ev.currentTarget).attr('name'), $(ev.currentTarget).val());
        this.model.set('valid', this.model.validate());
        this.render();
      },
      install: function() {
        // Verify the form is filled out correctly.
        this.model.isValid()

        // TODO
      }
    });
  }
);

