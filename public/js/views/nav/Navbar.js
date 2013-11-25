/*global define*/

define(
  ['marionette','vent','tpl!templates/nav/navbar.tmpl'],
  function (Marionette, vent, tmpl) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl
    });
  }
);
