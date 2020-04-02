const router = require('express').Router()

router.get('/',(req,res)=>{
    res.render('../views/TodoList')
})

module.exports = router