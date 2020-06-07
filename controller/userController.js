const userModel = require("../db/model/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = require('./authentication')

const d = new Date()
let date = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate()
let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

const signUpControl = async (userName, phone, email) => {
	try {
		let checkUserName = await userModel.findOne({ userName })
		let checkUserPhone = await userModel.findOne({ phone })
		let checkUserEmail = await userModel.findOne({ email })

		if (checkUserEmail) {
			console.log("your user Email already been saved")
			return true
		} else if (checkUserPhone) {
			console.log("your user Phone already been saved")
			return true
		} else if (checkUserName) {
			console.log("your user Name already been saved")
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error(error)
	}
}


const controller = {
	signUp: async (req, res) => {
		try {
			
			let { userName, phone, email, password } = req.body

			let existInDataBase = await signUpControl(userName, phone, email)
			if (existInDataBase == true) {
				await res
					.status(400)
					.send("your data exist in database please set another data")
				return
			} else {
				let salt = await bcrypt.genSalt(10)
				let hash = await bcrypt.hash(password, salt)

				const newPerson = new userModel({
					userName,
					phone,
					email,
					password: hash,
					signUpDate: date,
					signUpTime: time,
				})
				await newPerson.save()
				res.status(200)
				
			}
		} catch (err) {
			console.error(err)
		}
	},
	fetchAllData: async (req, res) => {
		try {
			let data = await userModel.find({})
			let count = await userModel.countDocuments({})
			await res.status(200).send({ data, count })
		} catch (err) {
			console.error(err)
		}
	},
	removeUser: async (req, res) => {
		try {
			await userModel.findByIdAndDelete(req.body._id)

			await res.end()
		} catch (err) {
			res.status(500).send(`something went wrong ${err}`)
			console.error(`something went wrong ${err}`)
		}
	},
	updateUser: async (req, res) => {
		const { userName, phone, email, password, _id } = req.body
		try {
			const user = await userModel.findByIdAndUpdate(_id, {
				$set: {
					userName,
					phone,
					email,
					password,
				},
			})
			if (!user) {
				return res.status(404).send("not found")
			}
			res.end()
		} catch (err) {
			console.error(err)
		}
	},
	loginUser:  async(req, res) => {
		try {
			const {email,password} = req.body
			let user = await userModel.findOne({email})
			
			if(!user){
				console.log(`your email not found in our database`)
				return res.status(400).json({err:`your email not found in our database`})
			}

			let result = await bcrypt.compare(password,user.password)

			if(!result){
				console.log('your password is incorrect please enter another password');
				return res.status(400).json({err:'your password is incorrect please enter another password'})
			}

			//GENEARATION TOKEN: _one day for expiration token ((60 minute * 60 seconds)*24 hours)

			let token = jwt.sign({
				_id: user._id.toHexString(),
				access:'auth'
			},process.env.JWT_SECRET_KEY,{expiresIn:(60*60)*24}).toString()

			user.tokens.push({
				token
			})

			res.status(200).send({token,userName:user.userName})
			return user.save()
			
        } catch (err) {
			console.error(err);
			res.status(400).send(err)
        }
	},

}

module.exports = controller
