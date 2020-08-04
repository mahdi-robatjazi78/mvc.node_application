const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const {goChatPage} = require("../controller/chatController")
const {upload} = require('../controller/server.extending')
const _AUTH = require("../controller/authentication")
const path = require("path")
const fs =require('fs')

router.get('/',function(req,res){
    res.render('../views/UserList.pug')
})


router.post('/fetch',controller.fetchAllData)

router.post('/signUp',upload.single('imgUser'),controller.signUp)
router.delete('/removeUserFromGroup',_AUTH,controller.removeUserFromGroup)
router.post('/login',controller.loginUser)


router.get("/chatPage",goChatPage)


module.exports = router