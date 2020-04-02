const {todoModel} = require('../db/model/UserModel')

const controller = {
    NewTask : async(req,res)=>{
        try {
            const body = req.body
            const newTask = new todoModel({
                todo : body.task,
                isDone : body.isDone
            })
            await newTask.save()
            await res.end()
            
        } catch (err) {
            console.error(err);            
        }
    }
}

module.exports = controller