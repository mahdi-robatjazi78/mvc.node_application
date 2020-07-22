require('dotenv').config()

const multer = require('multer')
	gridStorage = require('multer-gridfs-storage')
	crypto = require('crypto')
    path = require('path')


    // for storage user image into database

    storage = new gridStorage({
        url:process.env.MONGO_URI+process.env.MONGO_PORT+"/"+process.env.DB_NAME,
        options:{
            useUnifiedTopology:true,
            useNewUrlParser:true
        },
        file:(req,file)=>{
            return new Promise((resolve,reject)=>{
                crypto.randomBytes(16,(err,buffer)=>{
                    if(err) return reject(err)
                    const fileinfo = {
                        filename : buffer.toString('hex')+path.extname(file.originalname),
                        bucketName:'userImages',
                        metadata:{
                            userId:null
                        }
                    }
                    resolve(fileinfo)
                })
            })
        }
    })
    upload = multer({storage})


    get_date_time = () =>{
        var d = new Date()
        var datetime = {
            date : d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate(),
            time : d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        }
        return datetime
    }



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



module.exports = {upload , get_date_time , signUpControl}