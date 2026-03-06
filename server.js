const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000
// const db = require('./db/db.js')
const httpMapRouter = require('./routers/httpRouterMapCache.js')
const httpRedisRouter = require('./routers/httpRouterRedis.js')

app.use(express.json())
// app.use('/',httpMapRouter)
app.use('/',httpRedisRouter)


app.listen(PORT,()=>{
    console.log('server listening on port',PORT)
})