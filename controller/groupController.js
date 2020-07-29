const groupModel = require('../db/model/GroupModel')
const userModel = require('../db/model/UserModel')

const controller = {
    getGroupsData:(req,res)=>{
        const info = {
            owned_groups:req.user.owned_Groups,
            joined_groups:req.user.joined_Groups
        }
        res.status(200).send(info)
    },
    createGroup:async(req,res)=>{
        try {
            const {groupName} = req.body

            const findedGroupName = await groupModel.findOne({groupName})
            if(findedGroupName){
                req.flash("danger","لطفا یک نام دیگر وارد کن این نام تسخیر شده است")
                return res.redirect('/')
            }
            const group = new groupModel({
                creatorID:req.user._id.toHexString(),
                groupName,
            })
            await group.save()

            await userModel.findByIdAndUpdate(req.user._id,{
                $push:{
                    owned_Groups:groupName
                }
            })
            req.flash("success",`ذخیره شد (${groupName}‌)گروه شما با نام `)
            res.redirect('/')
        } catch (err) {
            console.error(err);
            res.status(400).send({msg:`something went wrong ${err}`})
        }

    },
    joinGroup:async(req,res)=>{
        try {
            const {groupName} = req.body
            const group = await groupModel.findOne({groupName})

            if(!group){
                req.flash("danger",`چنین گروهی وجود ندارد لطفا نام گروه را درست واردکن`)
                return res.redirect('/')
            }
             
            if(group.creatorID == req.user._id){
                req.flash("danger" , "شما صاحب این گروه هستید نمیتوانید به این گروه ملحق شوید")
                return res.redirect('/')
            }


            await group.updateOne({
                $push:{
                    members_joining_id:req.user._id.toHexString()
                },
                $inc:{
                    membersCount:+1
                }
            })
            await userModel.findByIdAndUpdate(req.user._id,{
                $push:{
                    joined_Groups:groupName
                }
            })
            req.flash('success',` عضو شدی ${groupName} شما با موفقیت به گروه`)
            res.redirect('/')

        } catch (err) {
            res.status(400).send({msg:err})
        }
    }
}

module.exports = controller