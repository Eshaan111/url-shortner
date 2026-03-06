require('dotenv').config()
const {Redis} = require("ioredis")

const client = new Redis(`rediss://default:${process.env.UPSTASH_REDIS_REST_TOKEN}@mature-alpaca-55882.upstash.io:6379`);



async function add_to_redis(mapType,short,long){
    if(mapType == 'shortMap'){
        await client.set(`code:${short}`,`${long}`,'EX',300)
        return; 
    }
    await client.set(`url:${long}`,`code:${short}`,'EX',300)
}

async function get_from_redis(mapType,short,long){
    if(mapType == 'shortMap'){
        res = await client.get(`code:${short}`);
        // if(res['expiresAt']<Date.now()){
        //     client.delete(short)
        // }
        return res;
    }

    res = await client.get(`url:${long}`)
    // if(res['expiresAt']<Date.now()){
    //         client.delete(long)
    //     }
    return res;
    
}

module.exports = {client, add_to_redis,get_from_redis}