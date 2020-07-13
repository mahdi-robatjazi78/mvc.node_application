const router = require('express').Router()
const userController = require('../controller/userController')
const {upload} = require('../controller/server.extending')
const _AUTH = require("../controller/authentication")


router.get('/',function(req,res){
    res.render('../views/UserList.pug')
})


router.get('/fetch',userController.fetchAllData)
router.post('/signUp',upload.single('imgUser'),userController.signUp)
router.delete('/removeUser',userController.removeUser)
router.put('/updateUser',userController.updateUser)
router.post('/login',userController.loginUser)
router.post('/logout',_AUTH,userController.logout)

module.exports = router