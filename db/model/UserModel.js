const {mongoose,conn} = require("../connection/connect")
const timestamps = require("mongoose-timestamp")

const UserSchema = new mongoose.Schema({
	userName: String,
	phone: String,
	email: String,
	password: String,
	signUpDate: String,
	signUpTime: String,
	cash:{
		type:Number,
		default:250
	},
	tokens: [
        { 
			_id:false,
            access:String,
            token: String,
        }
	],
	imageAddress:{
		_id:false,
		id:String,
		filename:String,
	}
	
})
UserSchema.plugin(timestamps)
const userModel = conn.model("user", UserSchema)
module.exports = userModel
