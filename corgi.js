
    var express = require('express'),
        _ = require('lodash'),
        util = require('util'),
        fs = require('fs'),
        os = require('os'),
        async = require('async'),
        http = require('http'),
        path = require ('path'),
        bcrypt = require('bcrypt'),
        MongoClient = require('mongodb').MongoClient,
        ObjectID = require('mongodb').ObjectID,
        Db = require('mongodb').Db,
        Server = require('mongodb').Server,
        Datastore = require('nedb'),
        connect = require('connect'),
        sockjs = require('sockjs'),
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        SALT_WORK_FACTOR = 10,
        pj = require('./package.json');

    var app = express();
    app.configure(function() {
      app.enable('trust proxy');
      app.set('views', __dirname + '/public');
      app.set('view engine', 'ejs');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(connect.compress());
      app.use(express.json());
      app.use(express.urlencoded());
      app.use(express.cookieParser());
      app.use(express.methodOverride());
      app.use(express.session({ secret: 'corgi is awesome' }));
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(app.router);
      app.use(require('less-middleware') ({
          src: __dirname + '/public/less',
          dest: __dirname + '/public/css',
          prefix: '/css'
      }));
      app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function() {
      app.use(express.errorHandler());
    });

    // Store pointers to mongo DBs
    var mongoDB = 'gsstmongo.td.teradata.com:27017/corgi',
        corgiDB,
        Users;
    MongoClient.connect('mongodb://' + mongoDB + '?maxPoolSize=100', function(err, db) {
      if(err) { return console.dir(err); }
      corgiDB = db;

      Users = db.collection('Users');
    });

    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
      Users.find({_id: ObjectID(id)}, function(err, user) {
        done(err, user);
      });
    });

    passport.use(new LocalStrategy(function (username, password, done) {
      console.log(username);
      console.log(password);
      
      Users.findOne({
        'username': username
      }, function (err, user) {
        console.log('LOGIN');
        console.log(user);

        if (err) { console.log(err); return done(err); }
                
        if (!user) {
          console.log('Could not find the user in the database.');
          return done(null, false);
        }

        if (!bcrypt.compareSync(password, user.hash)) {
          console.log('false');
          return done(null, false);
        }
        
        console.log('GOOD');      
        return done(null, user);
      });
    }));

    function ensureAuthenticated(req, res, next) {
      console.log(req.isAuthenticated());
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/');
    }

    function ensureAdmin(req, res, next) {
      if (req.user && req.user.admin === true) {
        next();
      }
      else {
        res.send(403);
      }
    }

    app.options('*', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELTE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(200);
    });

    app.get('/', function(req, res) {
      res.render('index', { title: pj.title, dev: process.argv[2] || false } );
    });

    app.post('/login', passport.authenticate('local', { successRedirect: '/#/home', failureRedirect: '/' }));

    app.post('/api/check', function(req, res) {
      if (req.isAuthenticated()) { return res.send(200); }
      res.send(403);
    });

    app.post('/setup', function(req, res) {
      var Users, Settings;
      function doSetup() {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.adminpassword, salt);
        var user = {username: 'admin', salt: salt, hash: hash};

        Users.insert(user, function(err, docs) {
          if (err) {
            console.dir(err);
          }
        });

        var settingsObj = {
          defaultPingInterval: parseInt(req.body.pinginterval),
          defaultMonitorInterval: parseInt(req.body.monitorinterval)
        };

        Settings.insert(settingsObj, function(err, docs) {
          if (err) {
            console.dir(err);
          }
        });
      }

      // Verify mongodb can be reached if specified
      if (req.body.mongo === 'Yes') {
        var db = new Db('corgi', new Server(req.body.mongoaddr, parseInt(req.body.mongoport)), {w: 0});
        db.open(function(oerr, db) {
          if (err) {
            console.dir(oerr);
          }

          Users = db.collection('Users');
          Settings = db.collection('Settings');

          doSetup();

          db.close();
        });
      }
      else {
        // Setup the NeDB database
        Users = new Datastore('./users.db', autoload: true);
        Settings = new Datastore('./settings.db', autoload: true);

        doSetup();
      }

      var fileSettings = {};
      if (req.body.mongo === 'Yes') {
        fileSettings.mongoaddr = req.body.mongoaddr;
        fileSettings.mongoport = req.body.mongoport;
      }
      fileSettings.corgiaddr = req.body.websocketsaddr;

      fs.writeFile('./settings.json', JSON.stringify(fileSettings, null, 2), function(err) {
        if(err) {
        
        }
        else {
          console.log('REDIRECT');
          res.redirect('/');
        }
      }); 
    });

    app.get('/api/settings', function(req, res) {
      fs.exists('./settings.json', function (exists) {
        res.send(exists);
      });
    });

    app.get('/api/dashboards/:id?*', function(req, res) {
      var dashboards = [];
      if (typeof req.params.id === undefined) {
        //dashboard['a'] = {};
      }
      else {

      }

      res.send(dashboards);
    });

    app.post('/api/dashboards/:id?*', function(req, res) {
      console.log(req.params.id);
    });

    app.patch('/api/dashboards/:id?*', function(req, res) {
      
    });

    app.delete('/api/dashboards/:id?*', function(req, res) {
      
    });

    app.get('/api/users/:id?*', function(req, res) {
      var users = [];
      if (typeof req.params.id === undefined) {
      }
      else {
      }

      res.send(users);
    });

    app.post('/api/users/:id?*', function(req, res) {
      console.log(req.params.id);
    });

    app.patch('/api/users/:id?*', function(req, res) {
      
    });

    app.delete('/api/users/:id?*', function(req, res) {
      
    });

    var server = http.createServer(app);

    // WebSockets
    var socket = sockjs.createServer({ 'sockjs_url': 'http://cdn.sockjs.org/sockjs-0.3.min.js' });

    socket.on('connection', function(connection) {
      var id = connection.id = new ObjectID().toHexString();

      connections.push(connection);

      connection.on('close', function() {
        _.remove(connections, function (connection) {
          return connection.id === id;
        });
      });
    });

    socket.installHandlers(server, { 'prefix': '/ws' });

    server.listen(3000, '0.0.0.0');
