define(
  ['backbone'],
  function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
      defaults : {
        mongo: 'No',
        mongoaddr: '',
        mongoport: '27017',
        adminpassword: 'admin',
        websocketsaddr: '',
        pinginterval: '2',
        monitorinterval: '10',
        packages: []
      },
      validation: {
        adminpassword: {
          required: true,
          msg: 'Admin user password is required.'
        },
        websocketsaddr: {
          required: true,
          msg: 'Corgi server fully qualified domain name is required.'
        },
        pinginterval: {
          min: 1,
          msg: 'Default interval for ping service is required.'
        },
        monitorinterval: {
          min: 1,
          msg: 'Default interval for monitor service is required.'
        },
        mongoaddr: function(value) {
          if (this.attributes.mongo === 'Yes' && Backbone.Validation.validators.required(value) === false) {
            return 'MongoDB server fully qualified domain name is required';
          }
        },
        mongoport: function(value) {
          if (this.attributes.mongo === 'Yes' && Backbone.Validation.validators.required(value) === false) {
            return 'MongoDB service port number is required';
          }
        }
      }
    });
  }
);
