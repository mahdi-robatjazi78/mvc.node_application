const {todoModel} = require('../db/model/TodoModel')
const {get_date_time} =require('./server.extending')




const todoController = {
    todoPage:async(req,res)=>{
        try {
            await res.render('../views/TodoList.pug')
        } catch (error) {
            console.log(error);
        }   
    },
    fetchAllTask:async(req,res)=>{
        try {
            let allTasks = await todoModel.find({userId:req.user._id})
            let count = allTasks.length
            await res.send({allTasks,count})
        } catch (err) {
            console.error(err);
        }
    },
    NewTask : async(req,res)=>{
        try {
            const body = req.body
            const userId = req.user._id

            var datetime = get_date_time()

            const newTask = new todoModel({
                todo : body.todo,
                isDone : false,
                time:datetime.time,
                date:datetime.date,
                userId
            })
            await newTask.save()
            res.status(200).send('your data saved now')
            
        } catch (err) {
            console.error(err);            
            res.status(400).send(err)
        }   
    },
    removeTask : async(req,res)=>{
        try {
            let todo = Object.keys(req.body)[0]
            await todoModel.findOneAndDelete({todo})
            res.end() 
        } catch (err) {
            console.error(err);
        }
    },
    updateTask : async(req,res)=>{
        try {
            let task = req.body.todo
            let oldTask = req.body.oldTask

           
            await todoModel.findOneAndUpdate({
                todo : oldTask
            },{
                $set:{todo:task}
            })


            await res.end()
        } catch (err) {
            console.error(err);
        }
    },
    done : async(req,res)=>{
        try {
            await todoModel.findOneAndUpdate({
                _id : req.body._id
            },{
                $set:{isDone:req.body.isChecked}
            })
            await res.end()
        } catch (err) {
            console.error(err);
        }
    },
    enabledTasks:async(req,res)=>{
        try {
            let allTasks = await todoModel.find({isDone:false,userId:req.user._id})
            let count = allTasks.length
            res.status(200).send({allTasks,count})
        } catch (err) {
            console.log(err);
        }
    },
    disabledTasks:async(req,res)=>{
        try {
            let allTasks = await todoModel.find({isDone:true,userId:req.user._id})
            let count = allTasks.length
            await res.send({allTasks,count})
        } catch (err) {
            console.log(err);
        }
    },
}

module.exports = todoController