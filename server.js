const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const bodyParser = require("body-parser")
const appRouter = require("./routes/index.routes")
const path = require('path')
const session = require('express-session')
const io = require('socket.io')(server)
const {chatOperation} = require("./controller/chatController")


require("dotenv").config()

app.set("view engine", "pug")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"public")))


app.use(session({
	secret:"my_secret_session_key",
	resave:true,
	saveUninitialized:true
}))

app.use(require('connect-flash')())
app.use(function(req,res,next){
	res.locals.messages = require('express-messages')(req,res)
	next()
})

app.use(appRouter)
var port	
var env = process.env
env.DEV ? port = env.DEV_APP_PORT : port = env.APP_PORT



server.listen(port, () => {
	console.log(`server is running on port ${port}`)
})


io.on("connection",(socket)=>{
	console.log('a user connected');
	socket.broadcast.emit('userConnection',"a user connected")
	chatOperation(socket)


})

