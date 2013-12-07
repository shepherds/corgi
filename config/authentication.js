module.exports = {

  //---------------------------
  // Select storage provider.
  // Supported providers: 'LDAP','local'
    //--------------------------'-
  provider : 'local',

  options : {
    //---------------------------
    // LDAP configuration
    //---------------------------
    'LDAP' : {
      host : '127.0.0.1',
      port: 27017,
      adminDn: 'cn=root',
      adminPassword: 'admin',
      searchBase: 'dc=corp,dc=corporate,dc=com',
      searchFilter: '(uid={{username}})'
    },

    //---------------------------
    // local configuration
    //---------------------------
    'local' : {
    }
  }
};
