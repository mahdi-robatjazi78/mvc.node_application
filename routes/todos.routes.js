const router = require('express').Router()
const TodoController = require('../controller/todo')


router.get('/',TodoController.fetchAllData)
router.post('/',TodoController.addTask)
router.delete('/',TodoController.removeTask)
router.put('/',TodoController.updateTask)


module.exports = router