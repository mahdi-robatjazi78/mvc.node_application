const mongoose = require('../connection/connect')

const schema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    signUpDate:String,
    signUpTime:String,
})



const userModel = mongoose.model('user',schema)

module.exports = {userModel}