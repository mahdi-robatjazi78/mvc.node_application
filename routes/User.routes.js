const router = require('express').Router()
const userController = require('../controller/userController')


router.get('/',function(req,res){
    res.render('../views/UserList.pug')
})


router.get('/userList',userController.fetchAllData)
router.post('/signUp',userController.signUp)
router.delete('/removeUser',userController.removeUser)
router.put('/updateUser',userController.updateUser)


module.exports = router