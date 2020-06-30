const userModel = require('../db/model/UserModel')
const fs = require('fs');
const path = require('path')


// this api write with promise not usage_await
const shopController = {
    shoppingPage:async(req,res)=>{
        try {
            
            fs.readFile( 
                path.join(__dirname,'../'+process.env.JSON_FILE_PATH_FOR_SHPPING_CENTER),
                'utf8',
                function(err,data){
                    if(err)console.log(err);
                    else{
    
                        res.render('shopping',{data:JSON.parse(data)})
    
                    }
    
                }
            )
        } catch (err) {
            console.error(err);
        }

    },
    buy:async(req,res)=>{
        try {
            let {priceCard,titleCard} = req.body
            let pricecard=priceCard.replace("$",'')
            let PriceCard=Number(pricecard)


            let user = await userModel.findByIdAndUpdate(req.user._id,{
                $inc:{
                    cash:-PriceCard
                }
            })

            res.status(200).json({cash:user.cash-PriceCard})

        } catch (err) {
            res.status(400).send(err)
        }
    }


           
}


module.exports = shopController

