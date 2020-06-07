const router = require('express').Router()
const todoController = require('../controller/todoController')
const _AUTH = require('../controller/authentication')
require('dotenv').config()

//todolist
router.get('/',todoController.todoPage)
router.get('/all',_AUTH,todoController.fetchAllTask)

//filtering
router.get('/enabled',_AUTH,todoController.enabledTasks)
router.get('/disabled',_AUTH,todoController.disabledTasks)

//api
router.post('/newTask',_AUTH,todoController.NewTask)
router.delete('/removeTask',_AUTH,todoController.removeTask)
router.put('/updateTask',_AUTH,todoController.updateTask)
router.post('/done',todoController.done)


module.exports = router