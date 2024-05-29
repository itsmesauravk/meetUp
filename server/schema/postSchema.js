const mongoose = require("mongoose")

const post  = new mongoose.Schema({
    caption: {type:String, required:true},
    image: {type:String, required:true},
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RegisterUser"
    }
})

const postData = mongoose.model("postData",post)

module.exports = postData