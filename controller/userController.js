const userModel = require('../db/model/UserModel')


const d = new Date()
let date = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate()
let time = d.getHours() +':'+d.getMinutes()+":"+d.getSeconds()


const controller = {
    signUp:async(req,res)=>{
        try{
            const {userName,phone,email,password} = req.body
            const newPerson = new userModel({
                userName,
                phone,
                email,
                password,
                signUpDate:date,
                signUpTime:time
            })
            await newPerson.save(()=>{
                res.end()
            })

        }catch(err){
            console.error(`${err}`);
        }
    },
    fetchAllData:async(req,res)=>{
        try {
            let data = await userModel.find({})
            let count = await userModel.countDocuments({})
            
            res.status(200).send({data,count})

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