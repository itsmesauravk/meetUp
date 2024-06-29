const mongoose = require("mongoose");
const RegisterUser = require("./login&register");

const followAndUnfollowSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "unFriend"
    },
    message: {
        type: String,
        default: "Requested",
        enum:["Requested","Friends","Rejected"]
    }
    ,
    "sender" : {
        type: mongoose.Schema.Types.ObjectId,
        ref: RegisterUser
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: RegisterUser 
    }
});

const FollowAndUnfollowUser = mongoose.model("FollowAndUnfollowUser", followAndUnfollowSchema);

module.exports = FollowAndUnfollowUser;
