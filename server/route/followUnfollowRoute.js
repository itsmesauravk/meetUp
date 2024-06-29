const express = require("express")
const {addFriend, getFriendRequest, acceptFriendRequest, rejectFriendReq} = require("../controller/followUnfollow")
const followUnfollowRouter = express.Router()

followUnfollowRouter.route("/add-friend").post(addFriend)
followUnfollowRouter.route("/get-request/:receiverId").get(getFriendRequest)
followUnfollowRouter.route("/accept-request/:reqId").patch(acceptFriendRequest)   
followUnfollowRouter.route("/reject-request/:reqId").delete(rejectFriendReq)

module.exports = followUnfollowRouter