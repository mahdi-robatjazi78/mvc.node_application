const router = require('express').Router()
const shopController = require('../controller/shoppingController')
const _AUTH = require('../controller/authentication')

router.get('/',shopController.shoppingPage)
router.put('/buy',_AUTH,shopController.buy)
module.exports = router