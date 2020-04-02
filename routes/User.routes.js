const router = require('express').Router()
const userController = require('../controller/userController')


router.get('/',(req,res)=>{
    res.render('../views/UserList.pug')
})


router.post('/signUp',userController.signUp)
router.get('/fetchAllData',userController.fetchAllData)
router.delete('/removeUser',userController.removeUser)
router.put('/updateUser',userController.updateUser)


module.exports = router