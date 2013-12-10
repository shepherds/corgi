define(
  ['backbone'],
  function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
      defaults : {
        name: ''
      },
      validation: {
        name: {
          required: true,
          msg: 'Data center name is required.'
        }
      }
    });
  }
);
