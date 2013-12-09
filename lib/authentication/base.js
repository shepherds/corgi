function AuthBase () {}

AuthBase.prototype.serializeUser = function (user, callback) {
  callback(null, null);
};

AuthBase.prototype.deserializeUser = function (id, callback) {
  callback(null);
};

AuthBase.prototype.authenticate = function (username, password, callback) {
  callback(null);
};

AuthBase.prototype.add = function (user, callback) {
  callback(null);
};

AuthBase.prototype.delete = function (id, callback) {
  callback(null);
};

AuthBase.prototype.forgotPassword = function (id, callback) {

};

module.exports = AuthBase;
