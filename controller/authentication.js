const jwt = require('jsonwebtoken')
require('dotenv').config()
const userModel = require('../db/model/UserModel')

module.exports =function(req,res,next){
    const token = req.header('Authorization')
    
    
    if(!token) return res.status(401).json({message:'Auth Error'})

    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

        
        userModel.findOne({
            _id:decoded._id
        }).then(User=>{
           
           
            req.user = User
            req.token = token
            next()

        })

    } catch (err) {
        console.error(err);
        res.status(500).send({message:"invalid Token"})
    }

}
