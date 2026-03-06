const express = require('express')
const router = express.Router();
const {getfromdb, addtodb, seedb} = require('../controllers/db_controls.js')
const {client,add_to_redis,get_from_redis} = require('../controllers/redis_controller.js');



router.post('/shorten',async (req,res)=>{
    url_to_shorten = req.body['url']
    console.log('REQS : SHORTEN req for LONG :  ',url_to_shorten)
    exists = await get_from_redis('longMap',null,url_to_shorten);
    if(exists){
        console.log(`HIT : `,exists)
        return exists; 
    }
    console.log('MISS : QUREING DB FOR SHORT')
    exists = getfromdb(url_to_shorten,'long')

    if(exists){
        console.log('INDB : ',exists)
        short = exists['short']
    }
    else{
        short = addtodb(url_to_shorten)
    }
    await add_to_redis('shortMap',short,url_to_shorten)
    await add_to_redis('longMap',short,url_to_shorten)

    // console.log('SHORT CACHE :',short_cache_map)
    // console.log('LONG CACHE :',long_cache_map)
    
    
    
})


router.get('/expand',async (req,res)=>{
    const code = req.query.code
    console.log('REQS : expand req for CODE :  ',code)
    exists = await get_from_redis('shortMap',code,null)
    if(exists){
        console.log(`HIT : `,exists)
        return exists;
    }
    console.log('MISS : QUREING DB FOR LONG ')
    exists = getfromdb(code,'short')
    if(exists){
        console.log('INDB : ',exists)
        await add_to_redis('shortMap',code,exists['long'])
        await add_to_redis('longMap',code,exists['long'])

    }else{
        console.log(`MISS : NOT IN DATABASE`)
    }

    // console.log('SHORT CACHE :',short_cache_map)
    // console.log('LONG CACHE :',long_cache_map)
    
})


module.exports = router;