define(
  ['backbone'],
  function(Backbone) {
    'use strict';

    return Backbone.Model.extend({
      idAttribute: 'id',
      urlRoot: 'rest/wizard',
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
          required: true
        },
        websocketsaddr: {
          required: true
        },
        pinginterval: {
          min: 1
        },
        monitorinterval: {
          min: 1
        },
        mongoaddr: function(value) {
          if (this.attributes.mongo === 'Yes' && !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === '') || (_.isArray(value) && _.isEmpty(value)))) {
            return 'mongoaddr is required';
          }
        }
      }
    });
  }
);
