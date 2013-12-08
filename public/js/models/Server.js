define(
  ['backbone'],
  function(Backbone) {
    'use strict';

    return Backbone.Model.extend({
      idAttribute: 'id',
      urlRoot: 'rest/servers',
      defaults : {
        name: '',
        ipaddr: '',
        groups: [],
        datacenter: '',
        cabinet: '',
        chasis: ''
      }
    });
  }
);
