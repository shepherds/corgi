/*global define*/
define(
  ['marionette','tpl!templates/main/admin/users.tmpl'],
  function (Marionette, tmpl) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl
    });
  }
);

