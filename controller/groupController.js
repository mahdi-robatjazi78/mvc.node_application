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
                return res.status(500).json({msg:'please write another group name this name already been decleared'})
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
            res.status(200).json({msg:'your group saved now'})
        } catch (err) {
            res.status(400).json({msg:`something went wrong ${err}`})
        }

    },
    joinGroup:async(req,res)=>{
        try {
            const {groupName} = req.body
            const group = await groupModel.findOne({groupName})

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
            res.status(200).json({msg:`you are successfully joined to ${groupName}`})

        } catch (err) {
            res.status(400).send(err)
        }
    }
}

module.exports = controller