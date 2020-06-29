const {mongoose,conn} = require("../connection/connect")
const timestamps = require("mongoose-timestamp")

const defaultOptionUserSchema = {
	type:String,
	trim:true,
}

const UserSchema = new mongoose.Schema({
	userName: defaultOptionUserSchema,
	phone: defaultOptionUserSchema,
	email: defaultOptionUserSchema,
	password: defaultOptionUserSchema,
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
