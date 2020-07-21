const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const appRouter = require("./routes/index.routes")

require("dotenv").config()

app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.use(appRouter)

let port
if(process.env.DEV){
	port = process.env.DEV_APP_PORT
}else{
	port = process.env.PRODUCT_APP_PORT
}

app.listen(port, () => {
	console.log(`server is running on port ${port}`)
})
