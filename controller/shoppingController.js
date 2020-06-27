const userModel = require('../db/model/UserModel')
const fs = require('fs');
const { url } = require('inspector');
const path = require('path')



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
    buy:(req,res)=>{
        console.log(req.body);
    }


}


module.exports = shopController

