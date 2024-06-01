const {addComment, commentUser, editComment, deleteComment} = require("../controller/comment")
const express = require("express")
const commentRouter = express.Router()

commentRouter.route("/add-comment/:id").post(addComment)
commentRouter.route("/get-comment-user-data").get(commentUser)
commentRouter.route("/edit-users-comment/:id").patch(editComment)
commentRouter.route("delete-users-comment/:id").delete(deleteComment)


module.exports = commentRouter