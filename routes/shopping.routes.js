const router = require('express').Router()
const shopController = require('../controller/shoppingController')


router.get('/',shopController.shoppingPage)

module.exports = router