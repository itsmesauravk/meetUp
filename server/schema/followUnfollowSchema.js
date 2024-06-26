const mongoose = require("mongoose");
const RegisterUser = require("./login&register");
const PostData = require("./postSchema");
const addUserComment = require("./commentSchema")

const followAndUnfollowSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "unFriend"
    },
    "sender" : {
        type: mongoose.Schema.Types.ObjectId,
        ref: RegisterUser
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: RegisterUser 
    },
    "post": {
        type: mongoose.Schema.Types.ObjectId,
        ref: PostData 
    },
    "comment":{
        type: mongoose.Schema.Types.ObjectId,
        ref: addUserComment
    }
});

const FollowAndUnfollowUser = mongoose.model("FollowAndUnfollowUser", followAndUnfollowSchema);

module.exports = FollowAndUnfollowUser;
