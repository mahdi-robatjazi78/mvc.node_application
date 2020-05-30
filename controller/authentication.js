const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports =function(req,res,next){
    
    const token = req.header('x-auth')
    if(!token) return res.status(401).json({message:'Auth Error'})

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decoded.user
        next()
    } catch (err) {
        console.error(err);
        res.status(500).send({message:"invalid Token"})
    }

}
