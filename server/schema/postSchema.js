const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    image: { type: String, required: true },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisterUser"
    },
    "likes": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisterUser"
    }]
}, {
    timestamps: true
});

const postData = mongoose.model("postData", postSchema);

module.exports = postData;
