require.config({
  baseUrl: '../',
  paths: {
    'chai':  './node_modules/chai/chai',
    'mocha': './node_modules/mocha/mocha'
  },
  "shim" : {
    "chai" : {
      "exports" : "chai"
    }
  }
});

require(['require', 'chai', 'mocha'], function(require, chai) {
  var should = chai.should();

  mocha.setup('bdd');

  require(['test/test'], function(test) {
    mocha.run();
  });
});