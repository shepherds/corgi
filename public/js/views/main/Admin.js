/*global define*/
define(
  ['marionette','tpl!templates/main/admin.tmpl'],
  function (Marionette, tmpl) {
    'use strict';

    return Marionette.Layout.extend({
      template: tmpl,
      className: 'admin-panel',
      regions: {
      	content: '#admin-content'
      }
    });
  }
);

