const router = require('express').Router()
const mainRoute = require('./main.routes')
const UserRoute = require('./User.routes')


router.use('/',mainRoute)
router.use('/User',UserRoute)


module.exports = router 