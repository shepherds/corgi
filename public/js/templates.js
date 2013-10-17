define(function(require) {
  'use strict';

  return {
  	login:           require('tpl!templates/login.tmpl'),
  	home:            require('tpl!templates/main/home.tmpl'),
  	header:          require('tpl!templates/main/header.tmpl'),
  	content:         require('tpl!templates/main/content.tmpl')
  };
});
