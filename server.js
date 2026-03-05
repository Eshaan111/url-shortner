const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
const db = require('./db/db.js')

app.use(express.json())

app.post('/shorten',(req,res)=>{
    url_to_shorten = req.body['url']
    console.log(url_to_shorten)
    checkindb(url_to_shorten)
})

function checkindb(url){
    const long = db.prepare('SELECT * FROM codes WHERE long = ?').get(url);
    exists = (long)?true:false;
    console.log(exists);

}


app.listen(PORT,()=>{
    console.log('server listening on port',PORT)
})