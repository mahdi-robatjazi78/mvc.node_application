const {mongoose} = require('../connection/connect')
const timestamps = require('mongoose-timestamp')

const TodoSchema = new mongoose.Schema({
    todo:String,
    isDone:Boolean,
    time:String,
    date:String,
    userId:String
})

TodoSchema.plugin(timestamps)

const todoModel = mongoose.model('tasks',TodoSchema)

module.exports = {todoModel}