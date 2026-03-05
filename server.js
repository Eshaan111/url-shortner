const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
const db = require('./db/db.js')

app.use(express.json())

app.post('/shorten',(req,res)=>{
    url_to_shorten = req.body['url']
    console.log(url_to_shorten)
    exists = checkindb(url_to_shorten,'long')
    if(exists){

    }
    else{
        addtodb(url_to_shorten)
    }
})


app.get('/expand',(req,res)=>{
    const code = req.query.code
    console.log('expand req for CODE :  ',code)
    exists = checkindb(code,'short')
    console.log('SHORT IS IN DB : ',exists)
})



function checkindb(url,type){
    const long = db.prepare(`SELECT * FROM codes WHERE ${type} = ?`).get(url);
    exists = (long)?long:false;
    console.log('IS IN DB : ',exists);
    return exists;
}



function addtodb(url){
    try{
        const insert = db.prepare('INSERT INTO codes (long) VALUES (?)')
        const result = insert.run(url)
        console.log(result.lastInsertRowid)
    }
    catch(e){
        console.log(e.messages)
    }
}



function seedb(){
    a = db.prepare('SELECT * from codes').all();
    console.log(a)
}
seedb();





app.listen(PORT,()=>{
    console.log('server listening on port',PORT)
})