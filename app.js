const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const appRouter = require("./routes")

require("dotenv").config()

app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.use(appRouter)



app.listen(process.env.APP_PORT, () => {
	console.log(`server is running on port ${process.env.APP_PORT}`)
})
