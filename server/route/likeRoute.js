const {likeComment, unlikeComment } = require("../controller/like")
const express = require("express")
const likeRouter = express.Router()


likeRouter.route("/comment-like").post(likeComment)
likeRouter.route("/comment-unlike").post(unlikeComment)


module.exports = likeRouter