const db = require('../db/db.js')

function checkindb(url,type){
    const long = db.prepare(`SELECT * FROM codes WHERE ${type} = ?`).get(url);
    exists = (long)?long:false;
    console.log(`${type} IS IN DB : `,exists);
    return exists;
}



function addtodb(url,type){
    try{
        const insert = db.prepare(`INSERT INTO codes (${type}) VALUES (?)`)
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
// seedb();

module.exports = {checkindb, addtodb, seedb}


