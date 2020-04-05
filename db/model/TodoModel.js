const mongoose = require('../connection/connect')

const TodoSchema = new mongoose.Schema({
    todo:String,
    isDone:Boolean,
    date:String,
    time:String
})

const todoModel = mongoose.model('tasks',TodoSchema)

module.exports = {todoModel}