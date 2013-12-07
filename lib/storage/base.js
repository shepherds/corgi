function StorageBase () {}

StorageBase.prototype.get = function (id, tbl, callback) {
  callback(null, null);
};

StorageBase.prototype.add = function (data, tbl, callback) {
  callback(null);
};

StorageBase.prototype.update = function (id, data, tbl, callback) {
  callback(null);
};

StorageBase.prototype.delete = function (id, tbl, callback) {
  callback(null);
};

StorageBase.prototype.close = function (callback) {

};

module.exports = StorageBase;
