define(
  ['backbone'],
  function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
      defaults: {
        username: '',
        password: ''
      },
      validation: {
        username: {
          required: true,
          msg: 'Username is required.'
        },
        password: {
          required: true,
          msg: 'Password is required.'
        }
      }
    });
  }
);
