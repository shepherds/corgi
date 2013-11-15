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
        mongoport: 27017,
        adminpassword: 'admin',
        websocketsaddr: '',
        monitorOption: 'sshauth',
        pinginterval: 2,
        monitorinterval: 10,
        packages: []
      }
    });
  }
);
