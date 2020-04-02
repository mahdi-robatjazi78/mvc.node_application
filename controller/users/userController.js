const {userModel} = require('../../db/model/UserModel')

const persianDate = require('persian-date')
persianDate.toLocale('en');
const date = new persianDate().format('YYYY/M/DD')

const d = new Date()
let time = d.getHours() +':'+d.getMinutes()+":"+d.getSeconds()


const controller = {
    signUp:async(req,res)=>{
        try{
            const {userName,email,password} = req.body
            const newPerson = new userModel({
                userName,
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
            await res.status(200).send(data)
        } catch (err) {
            console.error(err);
        }
    },
    removeUser:async(req,res)=>{
        try {
            const {userName,email,password} = req.body
            await userModel.findOneAndDelete({password})  

            await res.end()
            
        } catch (err) {
            res.status(500).send(`something went wrong ${err}`)
            console.error(`something went wrong ${err}`)
        }
    },
    updateUser:async(req,res)=>{
        const {userName,email,password,_id} = req.body
        try {
            const user = await userModel.findByIdAndUpdate(_id,{
                $set:{
                    userName,
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