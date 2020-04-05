const mongoose = require('../connection/connect')

const UserSchema = new mongoose.Schema({
    userName:String,
    phone:String,
    email:String,
    password:String,
    signUpDate:String,
    signUpTime:String,
})


const userModel = mongoose.model('user',UserSchema)

module.exports = userModel