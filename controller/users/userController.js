const {userModel} = require('../../db/model/UserModel')

const persianDate = require('persian-date')
persianDate.toLocale('en');
const date = new persianDate().format('YYYY/M/DD')

const controller = {
    signUp:async(req,res)=>{
        try{
            const {userName,email,password} = req.body
            const newPerson = new userModel({
                userName,
                email,
                password,
                signUpDate:date
            })

            await newPerson.save()
        }catch(err){
            console.error(`${err}`);
        }
    },
    fetchAllData:async(req,res)=>{
        try {
            let data = await userModel.find({})
            await res.status(200).send(data)
        } catch (err) {
            console.error(err);
        }
    }    
}

module.exports = controller