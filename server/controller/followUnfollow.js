const FollowAndUnfollowUser = require("../schema/followUnfollowSchema")


const getFriendRequest =async(req,res) =>{
    try {
        const senderId = req.params.id;
        const getRequest = await FollowAndUnfollowUser.find({senderId}).populate("user").populate("post").populate("comment")
        if(!getRequest){
            return res.status(404).json({success:false,message:"Unable to get the follow request"})
        }
        return res.status(200).json({success:true,message:"Follow req sent successfully"},getRequest)
    } catch (error) {
        return res.status(404).json({success:false,message:error})
    }
}


const addFriend = async(req,res) =>{
    try {
        const userId = req.params.id
        const postId = req.params.id

        const addFriends = await FollowAndUnfollowUser.create({
            "user":userId,
            "post":postId,
            status:"friends"
        })

        if(!addFriends){
            return res.status(404).json({success:false,message:'Not added.'})
        }

        return res.status(200).json({success:true,message:"added successfully",addFriends})

    } catch (error) {
        return res.status(400).json({success:false,message:error})
    }
}

module.exports = {addFriend,getFriendRequest}