const router = require('express').Router()
const controller = require('../controller/groupController')
const _AUTH = require('../controller/authentication')

router.post('/group_creation',_AUTH,controller.createGroup)
router.post('/group_joining',_AUTH,controller.joinGroup)
router.get('/get_User_Groups_Data',_AUTH,controller.getGroupsData)

module.exports =router