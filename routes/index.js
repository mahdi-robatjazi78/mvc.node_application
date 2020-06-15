const router = require('express').Router()


const mainRoute = require('./home.routes')
const UserRoute = require('./User.routes')
const AboutRoute = require('./aboutMe.routes')
const TodoRoute = require('./todos.routes')
const shopRoute = require('./shopping.routes')



router.use('/',mainRoute)
router.use('/userList',UserRoute)
router.use('/about',AboutRoute)
router.use('/todoList',TodoRoute)
router.use('/shopping',shopRoute)


module.exports = router 