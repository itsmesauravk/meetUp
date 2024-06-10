const mongoose = require('mongoose');
const RegisterUser = require('./login&register');
const postData = require("./postSchema");
const addUserComment = require('./commentSchema');

const likes = new mongoose.Schema({
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: RegisterUser,
        required: true
    },
    "comment":{
        type:mongoose.Schema.Types.ObjectId,
        ref: addUserComment
    },
    "post":{
        type: mongoose.Schema.Types.ObjectId,
        ref: postData
    },
    "likesCount": {
        type: Number,
        default: 0
    },
    "likedBy": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: RegisterUser
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const addUserLike = mongoose.model('addUserLike', likes);

module.exports = addUserLike;