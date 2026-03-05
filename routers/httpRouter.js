const express = require('express')
const router = express.Router();
const {getfromdb, addtodb, seedb} = require('../controllers/db_controls.js')


router.post('/shorten',(req,res)=>{
    url_to_shorten = req.body['url']
    console.log('SHORTEN req for LONG :  ',url_to_shorten)
    exists = getfromdb(url_to_shorten,'long')
    if(exists){

    }
    else{
        addtodb(url_to_shorten)
    }
})


router.get('/expand',(req,res)=>{
    const code = req.query.code
    console.log('expand req for CODE :  ',code)
    exists = getfromdb(code,'short')
    if(exists){
        let long = exists['long'];
        console.log(`LONG for ${code} : `,long)
    }
    
})


module.exports = router;