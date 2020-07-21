const mongoose = require("mongoose")
mongoose.Promise = global.Promise
require("dotenv").config()


let mongo_uri
let env = process.env

if(process.env.DEV){
	mongo_uri = env.DEV_MONGO_URI+env.MONGO_PORT+"/"+env.DB_NAME
}else{
	mongo_uri = env.PRODUCT_MONGO_URI
}

const conn = mongoose.createConnection(mongo_uri,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex:true,
})

conn.on("error", console.error.bind(console, "connection error:"))



module.exports = {mongoose, conn}
