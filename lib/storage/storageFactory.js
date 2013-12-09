var providerName = require ('../../config/storage').provider;

module.exports = {
  getStorageInstance : function () {
    var options = require ('../../config/storage').options[providerName];
    var provider = require ('./providers/' + providerName);
    return new provider(options);
  }
};
