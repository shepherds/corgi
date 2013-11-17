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
        'submit #setup-form'  : 'verify'
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
        $(this.el).find('[name="mongo"]').val($(ev.currentTarget).text());
        this.render();
      },
      updateModel: function(ev) {
        debugger;
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

        vent.trigger('route:remove', 'setup');

        $(this.el).find('#setup-form').submit();
      }
    });
  }
);

