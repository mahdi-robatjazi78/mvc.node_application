const router = require('express').Router()
const controller = require('../controller/userController')
const {upload} = require('../controller/server.extending')
const _AUTH = require("../controller/authentication")


router.get('/',function(req,res){
    res.render('../views/UserList.pug')
})


router.post('/fetch',controller.fetchAllData)

router.post('/signUp',upload.single('imgUser'),controller.signUp)
router.delete('/removeUserFromGroup',controller.removeUserFromGroup)
router.post('/login',controller.loginUser)


module.exports = router