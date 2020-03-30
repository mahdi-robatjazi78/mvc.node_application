const router = require('express').Router()
const mainRoute = require('./main.routes')
const todosRoute = require('./todos.routes')


router.use('/',mainRoute)
router.use('/todo',todosRoute)


module.exports = router 