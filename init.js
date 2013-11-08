// Setup database in Mongo
// Add admin/admin to Users collection
// ...
var bcrypt = require('bcrypt'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    MongoClient = require('mongodb').MongoClient,
    readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var db = new Db('corgi', new Server('gsstmongo.td.teradata.com', 27017), {w: 0});
db.open(function(err, p_db) {
	if (err) {
  		console.log(err);
	}

	var Users = p_db.collection('Users');

	rl.question("Please enter a password for user 'admin': ", function(answer) {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync((answer.length > 0) ? answer : 'admin', salt);
		var user = {username: 'admin', salt: salt, hash: hash};

		Users.insert(user, function(err, docs) {
			if (err) { console.dir(err); }
		});

		process.exit(0);
	});
});