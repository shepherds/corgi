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
        this.render();
      },
      install: function() {
        // TODO
      }
    });
  }
);

