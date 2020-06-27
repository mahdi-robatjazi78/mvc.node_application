const userModel = require('../db/model/UserModel')
const fs = require('fs');
<<<<<<< HEAD
const path = require('path')


=======
const { url } = require('inspector');
const path = require('path')



>>>>>>> #feature : add shopping center route and design it
// this api write with primise not usage_await
const shopController = {
    shoppingPage:(req,res)=>{
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

    },
<<<<<<< HEAD
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
=======
    buy:(req,res)=>{
        console.log(req.body);
>>>>>>> #feature : add shopping center route and design it
    }


}


module.exports = shopController

