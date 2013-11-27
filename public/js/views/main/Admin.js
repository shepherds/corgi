/*global define*/
define(
  ['marionette','tpl!templates/main/admin.tmpl'],
  function (Marionette, tmpl) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'admin-panel'
    });
  }
);

