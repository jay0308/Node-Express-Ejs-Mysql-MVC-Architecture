const env = require('./env.host.json');

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

let startCluster = function(app){
    if (env["ENV"] === "prod" && cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);
    
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        // respawn
        cluster.fork();
      });
    } else {
      // Workers can share any TCP connection
      // In this case it is an HTTP server//set port
        app.set('port', (process.env.PORT || env["PORT"] || 3000));
      app.listen(app.get('port'), function(){
        console.log('server started on port'+ app.get('port'));
      });
    
      console.log(`Worker ${process.pid} started`);
    }
}

module.exports = startCluster;