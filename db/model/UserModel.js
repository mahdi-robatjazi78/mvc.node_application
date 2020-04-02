const mongoose = require('../connection/connect')

const UserSchema = new mongoose.Schema({
    userName:String,
    phone:String,
    email:String,
    password:String,
    signUpDate:String,
    signUpTime:String,
})

const TodoSchema =new mongoose.Schema({
    todo:String,
    isDone:Boolean,
})



const userModel = mongoose.model('user',UserSchema)
const todoModel = mongoose.model('todo',TodoSchema)

module.exports = {userModel,todoModel}