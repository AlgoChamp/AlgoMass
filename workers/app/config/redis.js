const redis = require('ioredis');

let client;

(async () => {
  client = new redis({ host: 'redis-server', port: 6379 });

  client.on('error', (error) => console.error(`Error : ${error}`));
})();
module.exports = { client };
