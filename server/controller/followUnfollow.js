const FollowAndUnfollowUser = require("../schema/followUnfollowSchema")

const registerUser = require("../schema/login&register")


    // Add friend request
const addFriend = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        //for checking wether request available or not 
        const check = await FollowAndUnfollowUser.find({
            $or: [
                { user: senderId, sender: receiverId },
                { user: receiverId, sender: senderId }
            ]
        });

        if (check.length > 0) {
            return res.status(400).json({success:false, message:"Request already exist."})
        }

        const addFriendRequest = await FollowAndUnfollowUser.create({
            sender: senderId,
            user: receiverId
        });

        //for updating user friends list
        const sender = await registerUser.findByIdAndUpdate(senderId, {
            $push:{
                friends:{
                    userId: receiverId
                }
            }
        }, { new: true });

        const receiver = await registerUser.findByIdAndUpdate(receiverId,{
            $push:{
                friends:{
                    userId: senderId
                }
            }
        })

        if (!sender || !receiver) {
            return res.status(404).json({ success: false, message: 'Friend request not sent.' });
        }

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
        const getRequest = await FollowAndUnfollowUser.find({user:receiverId})
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