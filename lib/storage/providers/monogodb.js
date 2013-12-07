var util = require ('util');

function StorageMongoDB(options) {
  this.options = options || {};
  this.mongodb = require('mongodb');

  var self = this
  this.client = MongoClient.connect(this.options.host + ':' + this.options.port + '?maxPoolSize=100', function(err, db) {
    if(err) { return console.dir(err); }
    self.db = db;
  });
}

util.inherits(StorageMongoDB, require ('../base'));

StorageMongoDB.prototype.get = function (id, tbl, callback) {
  var query = {_id: id};
  if (Object.prototype.toString.call(id) === '[object Object]') {
    query = id;
  }

  ths.db.collection(tbl).find(query, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageMongoDB.prototype.add = function (data, tbl callback) {
  this.db.collection(tbl).insert(data, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageMongoDB.prototype.update = function (id, data, tbl, callback) {
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

  this.db.collection(tbl).update(query, update, options, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageMongoDB.prototype.delete = function (id, tbl, callback) {
  var query = {_id: id}, options = {};
  if (Object.prototype.toString.call(id) === '[object Object]') {
    query = id;
    options.multi = true;
  }

  this.db.collection(tbl).remove(query, options, function(err, docs) {
    callback(err, err ? null : docs);
  });
};

StorageMongoDB.prototype.close = function (callback) {
  this.db.close();
  callback(null, null);
};

module.exports = StorageMongoDB;
