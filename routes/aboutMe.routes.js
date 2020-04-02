const router = require('express').Router()

router.get('/',(req,res)=>{
    res.render('../views/AboutMe')
})

module.exports = router