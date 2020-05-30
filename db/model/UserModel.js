const mongoose = require("../connection/connect")
const timestamps = require("mongoose-timestamp")

const UserSchema = new mongoose.Schema({
	userName: String,
	phone: String,
	email: String,
	password: String,
	signUpDate: String,
	signUpTime: String,
	tokens: [
        { 
            access:String,
            token: String,
        }
    ],
})

UserSchema.plugin(timestamps)

const userModel = mongoose.model("user", UserSchema)

module.exports = userModel
