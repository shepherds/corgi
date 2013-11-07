define(
  ['backbone', 'models/System'],
  function(Backbone, System) {
    'use strict';

    return Backbone.Collection.extend({
      model: System,
      url: 'rest/systems'
    });
  }
);
