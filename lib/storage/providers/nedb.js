var util = require ('util');

function StorageNoDB(options) {
  this.options = options || {};
  this.nedb = require('nedb');
}

util.inherits(StorageNeoDB, require ('../base'));

StorageNeDB.prototype.get = function (id, tbl, callback) {
  var db = new Datastore({ filename: this.options.dir + '/' + tbl, autoload: true });
  var query = {_id: id};
  if (Object.prototype.toString.call(id) === '[object Object]') {
    query = id;
  }

  db.find(query, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageNeDB.prototype.add = function (data, tbl callback) {
  var db = new Datastore({ filename: this.options.dir + '/' + tbl, autoload: true });
  db.insert(data, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageNeDB.prototype.update = function (id, data, tbl, callback) {
  var db = new Datastore({ filename: this.options.dir + '/' + tbl, autoload: true });
  var query = {_id: id}, update = data, options = {};
  if (Object.prototype.toString.call(id) === '[object Object]') {
    query = id;
    options.multi = true;
  }

  if (Object.prototype.toString.call(data) === '[object Array]') {
    update = { $set: {} };
    Object.keys(data).forEach(function(key) {
      update.$set[key] = data[key];
    });
  }

  db.update(query, update, options, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageNeDB.prototype.delete = function (id, tbl, callback) {
  var db = new Datastore({ filename: this.options.dir + '/' + tbl, autoload: true });
  var query = {_id: id}, options = {};
  if (Object.prototype.toString.call(id) === '[object Object]') {
    query = id;
    options.multi = true;
  }

  db.remove(query, options, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageNeDB.prototype.close = function (callback) {
};

module.exports = StorageNeDB;
