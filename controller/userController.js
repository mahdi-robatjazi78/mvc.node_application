const userModel = require('../db/model/UserModel')
const bcrypt = require('bcryptjs')

const d = new Date()
let date = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate()
let time = d.getHours() +':'+d.getMinutes()+":"+d.getSeconds()


const signUpControl = async(userName,phone,email) =>{
    try {
        let checkUserName  = await userModel.findOne({userName})
        let checkUserPhone = await userModel.findOne({phone})
        let checkUserEmail = await userModel.findOne({email})

        if(checkUserEmail){
            console.log('your user Email already been saved');
            return true
        }
        else if(checkUserPhone){
            console.log('your user Phone already been saved');
            return true
        }
        else if(checkUserName){
            console.log('your user Name already been saved');
            return true
        }else{
            return false
        }
        
    } catch (error) {
        console.error(error);
    }
}


const controller = {
    signUp:async(req,res)=>{
        try{
            let {userName,phone,email,password} = req.body

            let existInDataBase = await signUpControl(userName,phone,email)
            if (existInDataBase == true){
                await res.status(400).send('your data exist in database please set another data')
                return

            }else{
                let salt = await bcrypt.genSalt(10)
                let hash = await bcrypt.hash(password,salt)
                
                const newPerson = new userModel({
                    userName,
                    phone,
                    email,
                    password:hash,
                    signUpDate : date,
                    signUpTime : time
                })
                await newPerson.save(()=>{
                    res.status(200).send('person successfully added to database')
                })  
            }
        }catch(err){
            console.error(err);
        }
    },



    fetchAllData:async(req,res)=>{
        try {
            let data = await userModel.find({})
            let count = await userModel.countDocuments({})
            await res.status(200).send({data,count})
        } catch (err) {
            console.error(err);
        }
    },
    removeUser:async(req,res)=>{
        try {
            const {password} = req.body
            await userModel.findOneAndDelete({password})  

            await res.end()
            
        } catch (err) {
            res.status(500).send(`something went wrong ${err}`)
            console.error(`something went wrong ${err}`)
        }
    },
    updateUser:async(req,res)=>{
        const {userName,phone,email,password,_id} = req.body
        try {
            const user = await userModel.findByIdAndUpdate(_id,{
                $set:{
                    userName,
                    phone,
                    email,
                    password
                }
            })
            if(!user){
                return res.status(404).send('not found')
            }
            res.end()
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = controller 