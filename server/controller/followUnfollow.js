const FollowAndUnfollowUser = require("../schema/followUnfollowSchema")


    // Add friend request
const addFriend = async (req, res) => {
    try {
        const { senderId, receiverId, postId, commentId, status } = req.body;

        const addFriendRequest = await FollowAndUnfollowUser.create({
            sender: senderId,
            user: receiverId,
            post: postId,
            comment: commentId,
            status
        });

        if (!addFriendRequest) {
            return res.status(404).json({ success: false, message: 'Friend request not sent.' });
        }

        return res.status(200).json({ success: true, message: "Friend request sent successfully", addFriendRequest });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getFriendRequest =async(req,res) =>{
    try {
        const receiverId = req.params.id;
        const getRequest = await FollowAndUnfollowUser.find({receiverId}).populate("user").populate("post").populate("comment")
        if(!getRequest){
            return res.status(404).json({success:false,message:"Unable to get the follow request"})
        }
        return res.status(200).json({success:true,message:"Follow req sent successfully"},getRequest)
    } catch (error) {
        return res.status(404).json({success:false,message:error})
    }
}

// Accept friend request
const acceptFriendRequest = async (req, res) => {
    try {
        const reqId = req.params.id;
        const acceptReq = await FollowAndUnfollowUser.findByIdAndUpdate(reqId, {
            status: "Accepted"
        }, { new: true });

        if (!acceptReq) {
            return res.status(404).json({ success: false, message: "Unable to accept the friend request" });
        }

        return res.status(200).json({ success: true, message: "Friend request accepted successfully", acceptReq });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const rejectFriendReq = async(req,res) =>{
    try {
        const reqId = req.params.id;
        const rejectReq = await FollowAndUnfollowUser.findByIdAndDelete({_id:reqId})

        if(!rejectReq){
            return res.status(404).json({success:false,message:"Unable to reject the user request"})
        }

        return res.status(200).json({sucess:true,message:"Rejected successfully"})
    } catch (error) {
        return res.status({success:false,message:"Rejected"})
    }
}

module.exports = {addFriend,getFriendRequest,acceptFriendRequest,rejectFriendReq}