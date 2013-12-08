define(
  ['backbone','zxcvbn'],
  function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
      defaults : {
        mongo: 'No',
        mongoaddr: '',
        mongoport: '27017',
        adminpassword: 'admin',
        adminemail: 'a@a.com',
        websocketsaddr: 'localhost',
        pinginterval: '2',
        monitorinterval: '10',
        loginmechanism: 'Built-in',
        ldapurl: 'ldap://',
        ldapadminuser: 'cn=root',
        ldapadminpassword: 'password',
        ldapsearchbase: 'dc=corp,dc=corporate,dc=com',
        ldapsearchfilter: '(uid={{username}})',
        packages: []
      },
      validation: {
        adminpassword: {
          required: true,
          msg: 'Admin user password is required.'
        },
        websocketsaddr: {
          required: true,
          msg: 'Corgi server fully qualified domain name is required.'
        },
        pinginterval: {
          min: 1,
          msg: 'Default interval for ping service is required.'
        },
        monitorinterval: {
          min: 1,
          msg: 'Default interval for monitor service is required.'
        },
        ldapurl: {
          required: true,
          msg: 'LDAP URL is required.'
        },
        ldapadminuser: {
          required: true,
          msg: 'LDAP administrator designated name is required.'
        },
        ldapadminpassword: {
          required: true,
          msg: 'LDAP administrator password is required.'
        },
        ldapsearchbase: {
          required: true,
          msg: 'LDAP search base is required.'
        },
        ldapsearchfilter: {
          required: true,
          msg: 'LDAP search filter is required.'
        },
        mongoaddr: function(value) {
          if (this.attributes.mongo === 'Yes' && Backbone.Validation.validators.required(value) === false) {
            return 'MongoDB server fully qualified domain name is required';
          }
        },
        mongoport: function(value) {
          if (this.attributes.mongo === 'Yes' && Backbone.Validation.validators.required(value) === false) {
            return 'MongoDB service port number is required';
          }
        }
      },
      checkPasswords : function() {
        console.log('checkPasswords');
        console.log(zxcvbn(this.get('adminpassword')));
        this.set('adminpassword_check', zxcvbn(this.get('adminpassword')));
        console.log(this);
      }
    });
  }
);
