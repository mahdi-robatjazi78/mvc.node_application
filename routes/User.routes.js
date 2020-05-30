const router = require('express').Router()
const userController = require('../controller/userController')

router.get('/',function(req,res){
    res.render('../views/UserList.pug')
})


router.get('/fetch',userController.fetchAllData)
router.post('/signUp',userController.signUp)
router.delete('/removeUser',userController.removeUser)
router.put('/updateUser',userController.updateUser)
router.post('/login',userController.loginUser)


module.exports = router