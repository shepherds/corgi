/*global define*/
define(
  ['marionette','vent','tpl!templates/wizard.tmpl'],
  function (Marionette, vent, tmpl) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'tr-container container'
    });
  }
);

