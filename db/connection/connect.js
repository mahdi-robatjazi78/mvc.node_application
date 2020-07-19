const mongoose = require("mongoose")
mongoose.Promise = global.Promise
require("dotenv").config()
const conn = mongoose.createConnection(
	`${process.env.MONGO_URI}${process.env.MONGO_PORT}/${process.env.DB_NAME}`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex:true
	}
)


conn.on("error", console.error.bind(console, "connection error:"))



module.exports = {mongoose, conn}
