const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000
// const db = require('./db/db.js')
const httprouter = require('./routers/httpRouter.js')

app.use(express.json())
app.use('/',httprouter)


app.listen(PORT,()=>{
    console.log('server listening on port',PORT)
})