require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const PfServer = express()

PfServer.use(cors())
PfServer.use(express.json())
PfServer.use(router)

const PORT = 3000 || process.env.PORT

PfServer.listen(PORT,()=>{
    console.log(`Server started running at port ${PORT}`);
})

// http://localhost:3000/ - get
PfServer.get('/',(req,res)=>{
    res.status(200).send(`<h3>Server is rinning!!</h3>`)
})