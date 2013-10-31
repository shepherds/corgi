define(
  ['backbone', 'models/Dashboard'],
  function(Backbone, Dashboard) {
    'use strict';

    return Backbone.Collection.extend({
      model: Dashboard,
      url: 'rest/dashboards'
    });
  }
);
