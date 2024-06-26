const express = require("express")
const {addFriend, getFriendRequest} = require("../controller/followUnfollow")
const followUnfollowRouter = express.Router()

followUnfollowRouter.route("/addfriend/:userId/postId").post(addFriend)
followUnfollowRouter.route("/get-follow-request").get(getFriendRequest)

module.exports = followUnfollowRouter