const redis = require('redis');
const {REDIS_CONFIG} = require('../conf/db.js');

// create client side
const redisClient = redis.createClient({
    url: `redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    legacyMode: true
})

// connect
redisClient.connected().then(()=>console.log('redis connect success.')).catch(console.error);

module.exports = redisClient;