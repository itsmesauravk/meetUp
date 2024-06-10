const mongoose = require("mongoose")
const RegisterUser = require("./login&register")
const postData = require("./postSchema")

const addComment = new mongoose.Schema({
    comment : {type:String, require:true},
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref: RegisterUser
    },
    "post":{
        type: mongoose.Schema.Types.ObjectId,
        ref: postData
    },
    likesCount: {
        type: Number,
        default: 0
    },
    "likedBy": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegisterUser'
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}) 



const addUserComment = mongoose.model("addUserComment",addComment)

module.exports = addUserComment