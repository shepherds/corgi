/*global define*/

define(
  ['marionette','tpl!templates/nav/navbar.tmpl'],
  function (Marionette, tmpl) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl
    });
  }
);
