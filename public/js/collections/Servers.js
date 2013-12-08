define(
  ['backbone', 'models/Server'],
  function(Backbone, Server) {
    'use strict';

    return Backbone.Collection.extend({
      model: Server,
      url: 'rest/servers'
    });
  }
);
