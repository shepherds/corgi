define(
  ['backbone'],
  function(Backbone) {
    'use strict';

    return Backbone.Model.extend({
      idAttribute: 'id',
      urlRoot: 'rest/systems',
      defaults : {
        name: 'Untitled',
        location: '',
        ipaddr: '',
        login: '',
        password: '',
        cabinet: '',
        chasis: ''
      }
    });
  }
);
