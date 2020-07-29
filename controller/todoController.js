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
            const {task,sender} = req.body
            let userId
            let datetime = get_date_time()
            
            let _writenBy ={
                self:undefined,
                groupName:undefined,
                admin:undefined,
                friend_name:undefined
            }
            
            if(sender[0]==="self"){
                userId = req.user._id
                _writenBy.self = true
            }
            else if(sender[0]==="admin"){
                userId = sender[2]
                _writenBy.admin=true
                _writenBy.groupName = sender[1]
            }
            else if(sender[0]==="friend"){
                userId = sender[2]
                _writenBy.groupName = sender[1]
                _writenBy.friend_name = req.user.userName
            }

            const newTask = new todoModel({
                todo : task,
                isDone : false,
                time:datetime.time,
                date:datetime.date,
                userId,
                sender:_writenBy
            })
            await newTask.save()

            req.flash("success","تسک شماباموفقیت ‌ذخیره شد")
            return res.redirect('/todoList')
           
        } catch (err) {
            console.error(err);            
            res.status(400).send({msg:err})
        }   
    },
    removeTask : async(req,res)=>{
        try {
            let todo = Object.keys(req.body)[0]
            await todoModel.findOneAndDelete({todo})
            req.flash('primary',"شمایک تسک حذف کردید ")
            res.redirect("/todoList")
        } catch (err) {
            console.error(err);
            req.flash("danger","مشکلی رخ داد دوباره امتحان کنید")
            res.redirect('/todoList')
        }
    },
    updateTask : async(req,res)=>{
        try {
            let task = req.body.task
            let oldTask = req.body.oldTask

           
            const findingTodo= await todoModel.findOne({
                todo : oldTask
            })
            await findingTodo.update({
                $set:{
                    todo:task
                }
            })
            req.flash("primary",`تسک شماباموفقیت تغییر یافت`)
            res.redirect("/todoList")
            
        } catch (err) {
            console.error(err);
            req.flash('danger',"مشکلی رخ داد دوباره امتحان کنید")
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