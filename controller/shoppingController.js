const userModel = require('../db/model/UserModel')


const shopController = {
    shoppingPage:async(req,res)=>{
        try {
            res.render('shopping',{})
        } catch (err) {
            console.error(err)
        }  
    }
}


module.exports = shopController

