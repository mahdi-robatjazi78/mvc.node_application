const router = require('express').Router()
const userController = require('../controller/userController')

const mainRoute = require('./home.routes')
const UserRoute = require('./User.routes')
const AboutRoute = require('./about.routes')
const TodoRoute = require('./todos.routes')
const shopRoute = require('./shopping.routes')
const groupRoute = require('./group.routes')

const ProfileRoute = require('./profile/profile.routes')

router.use('/',mainRoute)
router.use('/userList',UserRoute)
router.use('/about',AboutRoute)
router.use('/todoList',TodoRoute)
router.use('/shopping',shopRoute)
router.use('/group',groupRoute)
router.use('/profile',ProfileRoute)

router.get('/image/user/:filename',userController.getUserImage)

//404 page
router.all('*',(req,res)=>{
    res.render("404.pug")
})

module.exports = router 