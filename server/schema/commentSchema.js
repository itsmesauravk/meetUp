const mongoose = require("mongoose")
const RegisterUser = require("./login&register")

const addComment = new mongoose.Schema({
    comment : {type:String, require:true},
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref: RegisterUser
    }
})

const addUserComment = mongoose.model("addUserComment",addComment)

module.exports = addUserComment