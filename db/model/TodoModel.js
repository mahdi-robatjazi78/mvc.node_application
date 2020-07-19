const {mongoose , conn} = require('../connection/connect')
const timestamps = require('mongoose-timestamp')

const TodoSchema = new mongoose.Schema({
    todo:String,
    isDone:Boolean,
    time:String,
    date:String,
    userId:String,
    sender:{
        self:{
            _id:false,
            type:Boolean,
            require:false
        },
        groupName:{
            _id:false,
            type:String,
            require:false,
        },
        admin:{
            _id:false,
            type:Boolean,
            require:false
        },
        friend_name:{
            _id:false,
            type:String,
            require:false
        }
    }
})

TodoSchema.plugin(timestamps)

const todoModel = conn.model('tasks',TodoSchema)

module.exports = {todoModel}