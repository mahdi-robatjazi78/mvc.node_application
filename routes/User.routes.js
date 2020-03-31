const router = require('express').Router()
const usersController = require('../controller/users/userController')


router.post('/',usersController.signUp)
router.get('/',usersController.fetchAllData)


module.exports = router