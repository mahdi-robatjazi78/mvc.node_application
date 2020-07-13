const { mongoose,conn } = require('../db/connection/connect')
const { get_date_time, signUpControl } = require('./server.extending')
	userModel = require('../db/model/UserModel')
	bcrypt = require("bcryptjs")
	jwt = require('jsonwebtoken')
	mongodb = require('mongodb')
	gridfsbucket = mongodb.GridFSBucket
require('dotenv').config()



var bucket
conn.once("open", function () {
	bucket = new gridfsbucket(conn.db, {
		bucketName: 'userImages'
	})
	console.log("we're connected!")
})

const controller = {
	signUp: async (req, res) => {
		try {
			let { userName, phone, email, password } = req.body
			let existInDataBase = signUpControl(userName, phone, email)
			if (existInDataBase == true) {
				await res
					.status(400)
					.send("your data exist in database please set another data")
				return
			} else {
				let salt = await bcrypt.genSalt(10)
				let hash = await bcrypt.hash(password, salt)

				var datetime = get_date_time()


				const newPerson = new userModel({
					userName,
					phone,
					email,
					password: hash,
					signUpDate: datetime.date,
					signUpTime: datetime.time
				})


				const token = jwt.sign({
					_id: newPerson._id.toHexString(),
					access: 'auth'
				}, process.env.JWT_SECRET_KEY).toString()

				newPerson.tokens.push({ token })

				if (req.file) {
					newPerson.imageAddress.id = req.file.id
					newPerson.imageAddress.filename = req.file.filename
				}

				await newPerson.save()
				if(req.file){
					conn.collection('userImages.files').findOneAndUpdate(
						{ _id: req.file.id },
						{
							$set: {
								metadata: {
									userId: newPerson._id
								}
							}
						}
					)
				}

				res.status(200).json({
					msg: 'you are signUp now ; and you into our userList. congratulations',
					userName: newPerson.userName,
					imageFilename: req.file.filename,
					cash: newPerson.cash,
					token
				})

			}
		} catch (err) {
			console.error(err)
			res.status(400).send(err)
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
			const user =await userModel.findById(req.body._id)
			if(!user){
				return res.status(404).send("this user not found!!! in our database")
			}
			if(user.imageAddress){
				let obj_id = await new mongoose.Types.ObjectId(user.imageAddress.id)
				bucket.delete(obj_id)
				await userModel.findByIdAndDelete(req.body._id)
			}else{
				await userModel.findByIdAndDelete(req.body._id)
			}

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
	loginUser: async (req, res) => {
		try {
			const { email, password } = req.body
			let user = await userModel.findOne({ email })

			if (!user) {
				console.log(`your email not found in our database`)
				return res.status(400).json({ err: `your email not found in our database` })
			}

			let result = await bcrypt.compare(password, user.password)

			if (!result) {
				console.log('your password is incorrect please enter another password');
				return res.status(400).json({ err: 'your password is incorrect please enter another password' })
			}

			//GENEARATION TOKEN: _one day for expiration token ((60 minute * 60 seconds)*24 hours)

			let token = jwt.sign({
				_id: user._id.toHexString(),
				access: 'auth'
			}, process.env.JWT_SECRET_KEY, { expiresIn: (60 * 60) * 24 }).toString()

			user.tokens.push({
				token
			})
			res.status(200).json({
				userName: user.userName,
				imageFilename:user.imageAddress.filename,
				cash: user.cash,
				token,
				msg: 'you are login now congratulations!' 
			})
			return user.save()

		} catch (err) {
			console.error(err);
			res.status(400).send(err)
		}
	},
	getUserImage:async(req, res) => {
		try {
			const address = req.params.filename
			// console.log(address);
			const downloadStream = await bucket.openDownloadStreamByName(address)
			downloadStream.pipe(res)
		} catch (err) {
			res.status(400).send(err)			
		}
	},
	logout:async (req, res) => {
		try{
			let user = await userModel.findOneAndUpdate({
				_id:req.user._id
			},{
				$pull:{
					tokens:{
						token:req.token
					}
				}
			})

			if(user){
				return res.status(200).send("user logout operation successfully is done")
			}	
			reject(user)
		}catch(err){
			res.staus(500).send(err)
		}
	}

}

module.exports = controller
