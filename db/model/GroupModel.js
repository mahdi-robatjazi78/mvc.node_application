const {mongoose,conn} = require('../connection/connect')
const timestamps = require('mongoose-timestamp')

const GroupSchema = new mongoose.Schema({
    creatorID:{
        type:String
    },
    groupName:{
        type:String,
        unique:true,  
    },
    membersCount:{
        type:Number,
        default:0
    },
    members_joining_id:{
        _id:false,
        type:Array,
    }
})


GroupSchema.plugin(timestamps)
const groupModel = conn.model('groups' , GroupSchema)
module.exports = groupModel