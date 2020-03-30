const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const appRouter = require("./routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use(appRouter)



app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
