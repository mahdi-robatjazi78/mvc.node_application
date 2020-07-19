const router = require('express').Router()

router.get('/',(req,res)=>{
    res.render('../views/about')
})

module.exports = router