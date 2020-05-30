const mongoose = require("mongoose")
mongoose.Promise = global.Promise
require("dotenv").config()

mongoose.connect(
	`${process.env.MONGO_URI}${process.env.MONGO_PORT}/${process.env.DB_NAME}`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	}
)

var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("we're connected!")
})

module.exports = mongoose
