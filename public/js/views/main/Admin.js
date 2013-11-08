/*global define*/
define(
  ['marionette','vent','tpl!templates/main/admin.tmpl'],
  function (Marionette, vent, admin) {
    'use strict';

    return Marionette.ItemView.extend({
      template: admin
      
    });
  }
);

