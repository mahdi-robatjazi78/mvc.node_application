const router = require('express').Router()
const usersController = require('../controller/users/userController')


router.post('/',usersController.signUp)
router.get('/',usersController.fetchAllData)
router.delete('/',usersController.removeUser)
router.put('/',usersController.updateUser)


module.exports = router