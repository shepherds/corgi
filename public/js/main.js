require.config({
  baseUrl: 'js',
  paths: {
    'backbone':              '../vendor/backbone/backbone',
    'backbone.babysitter':   '../vendor/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.wreqr':        '../vendor/backbone.wreqr/lib/amd/backbone.wreqr',
    'bootstrap':             '../vendor/bootstrap/docs/assets/js/bootstrap',
    'rrule':                 '../vendor/rrule/lib/rrule',
    'd3':                    '../vendor/d3/d3',
    'jquery':                '../vendor/jquery/jquery',
    'json':                  '../vendor/json2/json2',
    'marionette':            '../vendor/marionette/lib/core/amd/backbone.marionette',
    'pj':                    'package.json', //symlink of root package.json
    'text':                  '../vendor/text/text',
    'tpl':                   '../vendor/tpl/tpl',
    'bootstrap-spinedit':    '../vendor/bootstrap-spinedit/js/bootstrap-spinedit',
    'underscore':            '../vendor/lodash/dist/lodash',
    'moment':                '../vendor/momentjs/min/moment+langs.min'
  },
  shim : {
    'backbone' : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'bootstrap-spinedit': {
      deps: ['bootstrap']
    },
    'jquery' : {
      exports : 'jQuery'
    },
    'underscore' : {
      exports : '_'
    },
    'json' : {
      exports : 'JSON'
    },
    'd3' : {
      exports : 'd3'
    },
    'rrule' : {
      deps: ['jquery', 'underscore']
    }
  }
});

require(
  ['app','backbone','bootstrap', 'bootstrap-spinedit', 'rrule', 'json'],
  function(app, Backbone) {
    'use strict';

    app.start();
  }
);