const express = require('express')
const router = express.Router();
const {getfromdb, addtodb, seedb} = require('../controllers/db_controls.js')
const {short_cache_map,long_cache_map,add_to_cache,get_from_cache} = require('../controllers/map_cache_controller.js');
const { nanoid } = require('nanoid');


router.post('/shorten',(req,res)=>{
    url_to_shorten = req.body['url']
    console.log('REQS : SHORTEN req for LONG :  ',url_to_shorten)
    exists = get_from_cache('longMap',null,url_to_shorten);
    if(exists){
        console.log(`HIT : `,exists)
        add_to_cache('shortMap',exists['code'],url_to_shorten)
        add_to_cache('longMap',exists['code'],url_to_shorten)
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
    add_to_cache('shortMap',short,url_to_shorten)
    add_to_cache('longMap',short,url_to_shorten)

    console.log('SHORT CACHE :',short_cache_map)
    console.log('LONG CACHE :',long_cache_map)
    
    
    
})


router.get('/expand',(req,res)=>{
    const code = req.query.code
    console.log('REQS : expand req for CODE :  ',code)
    exists = get_from_cache('shortMap',code,null)
    if(exists){
        console.log(`HIT : `,exists)
        add_to_cache('shortMap',code,exists['url'])
        add_to_cache('longMap',code,exists['url'])
        return exists;
    }
    console.log('MISS : QUREING DB FOR LONG ')
    exists = getfromdb(code,'short')
    if(exists){
        console.log('INDB : ',exists)
        add_to_cache('shortMap',code,exists['long'])
        add_to_cache('longMap',code,exists['long'])

    }else{
        console.log(`MISS : NOT IN DATABASE`)
    }

    console.log('SHORT CACHE :',short_cache_map)
    console.log('LONG CACHE :',long_cache_map)
    
})


module.exports = router;