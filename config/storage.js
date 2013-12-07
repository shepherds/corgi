module.exports = {

  //---------------------------
  // Select storage provider.
  // Supported providers: 'mongodb','nedb'
    //--------------------------'-
  provider : 'nedb',

  options : {
    //---------------------------
    // mongodb configuration
    //---------------------------
    'mongodb' : {
      host : '127.0.0.1',
      port: 27017,
      username: 'admin',
      password: 'admin',
      db: 'corgi'
    },

    //---------------------------
    // nedb configuration
    //---------------------------
    'nedb' : {
      dir: '/var/corgi'
    }
  }
};
