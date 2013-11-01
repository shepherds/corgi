var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if ( cluster.isMaster ) {
    for ( var i = 0; i < numCPUs; ++i ) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
}
else {
    var express = require('express'),
        _ = require('lodash'),
        util = require('util'),
        fs = require('fs'),
        async = require('async'),
        http = require('http'),
        path = require ('path'),
        connect = require('connect'),
        pj = require('./package.json');

    var app = express();
    app.configure(function() {
      app.enable('trust proxy');
      app.set('views', __dirname + '/public');
      app.set('view engine', 'ejs');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(connect.compress());
      app.use(express.bodyParser());
      app.use(express.cookieParser());
      app.use(express.methodOverride());
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

    function originPolicy(req, res, next) {
        res.header('access-control-allow-origin', '*');
        res.header('access-control-allow-headers', 'origin, content-type, accept, x-requested-with');
        res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
        return next();
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

    app.get('/rest/dashboards/:id?*', function(req, res) {
      var dashboards = [];
      if (typeof req.params.id === undefined) {
        //dashboard['a'] = {};
      }
      else {

      }

      res.send(dashboards);
    });

    app.post('/rest/dashboards/:id?*', function(req, res) {
      console.log(req.params.id);
    });

    app.patch('/rest/dashboards/:id?*', function(req, res) {
      
    });

    app.delete('/rest/dashboards/:id?*', function(req, res) {
      
    });

    app.get('/rest/users/:id?*', function(req, res) {
      var users = [];
      if (typeof req.params.id === undefined) {
      }
      else {
      }

      res.send(users);
    });

    app.post('/rest/users/:id?*', function(req, res) {
      console.log(req.params.id);
    });

    app.patch('/rest/users/:id?*', function(req, res) {
      
    });

    app.delete('/rest/users/:id?*', function(req, res) {
      
    });

    http.createServer(app).listen(5060);
}