var Connection = require('ssh2');

function ssh(entity, cmds, callback) {
  var startTime = new Date(),
      timings = {};
  var c = new Connection();
  c.on('connect', function() {
    timings['connect'] = (new Date() - startTime);
  });

  c.on('ready', function() {
    cmds.forEach(function(n) {
      c.exec(n.command, function(err, stream) {
        if (err) throw err;
        stream.on('data', function(data, extended) {
          
          console.log((extended === 'stderr' ? 'STDERR: ' : 'STDOUT: ')
                      + data);
        });
        stream.on('end', function() {
          console.log('Stream :: EOF');
        });
        stream.on('close', function() {
          console.log('Stream :: close');
        });
        stream.on('exit', function(code, signal) {
          console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
          c.end();
        });
      });
    });
  });

  c.on('error', function(err) {
    return 'FAILED! Unable to run the command:' + '' + '. Error returned: ' + err;
  });

  c.on('close', function(hadError) {
    timings['total'] = (new Date() - startTime);
  });

  c.connect({
    host: entity.host.host,
    port: entity.host.port,
    username: entity.host.username,
    privateKey: require('fs').readFileSync(entity.key)
  });

  // example output:
  // Connection :: connect
  // Connection :: ready
  // STDOUT:  17:41:15 up 22 days, 18:09,  1 user,  load average: 0.00, 0.01, 0.05
  //
  // Stream :: exit :: code: 0, signal: undefined
  // Connection :: end
  // Connection :: close
}

module.exports.ssh = ssh;
