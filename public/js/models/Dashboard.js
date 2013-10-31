define(
  ['backbone'],
  function(Backbone) {
    'use strict';

    return Backbone.Model.extend({
      idAttribute: 'id',
      urlRoot: 'rest/dashboards',
      defaults : {
        name: 'Untitled',
        owner: 'N/A',
        shared: []
      }
    });
  }
);
