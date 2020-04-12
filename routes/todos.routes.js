const router = require('express').Router()
const todoController = require('../controller/todoController')


router.get('/',todoController.fetchAllTask)
//filtering
router.get('/all',todoController.fetchAllTask)
router.get('/enabled',todoController.enabledTasks)
router.get('/disabled',todoController.disabledTasks)

//api
router.post('/newTask',todoController.NewTask)
router.delete('/removeTask',todoController.removeTask)
router.put('/updateTask',todoController.updateTask)
router.post('/done',todoController.done)


module.exports = router