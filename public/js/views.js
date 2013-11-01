define(function(require) {
  'use strict';

  return {
  	login:           require('views/Login'),
  	home:            require('views/main/Home'),
  	header:          require('views/main/Header'),
  	content:         require('views/main/Content'),
  	admin:           require('views/main/Admin'),
  	newdashboard:    require('views/main/NewDashboard')
  };
});
