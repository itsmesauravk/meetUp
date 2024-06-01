const {addComment, commentUser} = require("../controller/comment")
const express = require("express")
const commentRouter = express.Router()

commentRouter.route("/add-comment/:id").post(addComment)
commentRouter.route("/get-comment-user-data").get(commentUser)


module.exports = commentRouter