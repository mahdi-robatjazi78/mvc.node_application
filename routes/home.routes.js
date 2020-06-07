const router = require('express').Router()

router.get('/',(req,res)=>{
    res.render('../views/index.pug')
})

module.exports = router