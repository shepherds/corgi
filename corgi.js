
    var express = require('express'),
        _ = require('lodash'),
        util = require('util'),
        fs = require('fs'),
        async = require('async'),
        http = require('http'),
        path = require ('path'),
        bcrypt = require('bcrypt'),
        MongoClient = require('mongodb').MongoClient,
        ObjectID = require('mongodb').ObjectID,
        connect = require('connect'),
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
      app.use(express.session({ secret: 'keyboard cat' }));
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
                
        return done(null, user);
      });
    }));

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

    app.post('/login', passport.authenticate('local', { successRedirect: '/#home', failureRedirect: '/' }));

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

    http.createServer(app).listen(5060);
