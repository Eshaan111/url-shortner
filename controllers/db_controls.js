const db = require('../db/db.js')
const {nanoid} = require('nanoid')

function getfromdb(url,type){
    const long = db.prepare(`SELECT * FROM codes WHERE ${type} = ?`).get(url);
    exists = (long)?long:false;
    // console.log(`${type} IS IN DB : `,exists);
    return exists;
}


function addtodb(url){
    console.log('adding to DB')
    try{
        const shortened = nanoid(10);
        const insert = db.prepare(`INSERT INTO codes (long, short) VALUES (?, ?)`)
        const result = insert.run(url,shortened)
        // console.log(shortened)
        // console.log(result.lastInsertRowid)
        return shortened;
    }
    catch(e){
        console.log(e.messages)
    }
}



function seedb(){
    a = db.prepare('SELECT * from codes').all();
    console.log(a)
}
// seedb();

module.exports = {getfromdb, addtodb, seedb}


