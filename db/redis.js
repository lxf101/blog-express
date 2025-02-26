const {createClient} = require('redis');
const {REDIS_CONFIG} = require('../conf/db.js');

// create client side
const redisClient = createClient({
    url: `redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    legacyMode: false
})

// connect
redisClient.connect().then(()=>console.log('redis connect success.')).catch(console.error);

module.exports = redisClient;