const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const appRouter = require("./routes")
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const accessLogStream = fs.createWriteStream(path.join(__dirname,'log/logger.log'))


app.set('view engine' , 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use(morgan('combined',{stream:accessLogStream}))
app.use(appRouter)


app.listen(3000,()=>{
    console.log(`server is running on port 3000`)
})
