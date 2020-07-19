const router = require('express').Router()
const controller = require("../../controller/userController")
const _AUTH = require('../../controller/authentication')

router.get("/register",(req,res)=>{
    res.render("register.pug")
})

router.get('/login',(req,res)=>{
    res.render('login.pug')
})

router.get('/editProfile',(req,res)=>{
    res.render('editProfile.pug')
})

router.get('/updatePageData',_AUTH,controller.getUpdatePageUserData)
router.put('/editProfile',_AUTH,controller.editProfile)


router.post('/logout',_AUTH,controller.logout)


module.exports = router