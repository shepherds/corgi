define(
  ['backbone'],
  function(Backbone) {
    'use strict';

    return Backbone.Model.extend({
      idAttribute: 'id',
      urlRoot: 'rest/users',
      defaults : {
        username: '',
        email: '',
        datecreated: '',
        datelastmodified: '',
        groups: [],
        permissions: {}
      }
    });
  }
);
