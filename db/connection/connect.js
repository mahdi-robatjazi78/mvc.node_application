const mongoose = require("mongoose")
mongoose.Promise = global.Promise
require("dotenv").config()


let env = process.env
let uri = env.OFLINE_MONGO_URI+env.MONGO_PORT+"/"+env.DB_NAME 


const conn = mongoose.createConnection(uri,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex:true,
})

conn.on("error", console.error.bind(console, "connection error:"))



module.exports = {mongoose, conn}
