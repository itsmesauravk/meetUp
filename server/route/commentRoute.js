const {addComment, commentUser, editComment, deleteComment, uploadPdf, likeComment, unlikeComment, getCommentLikedUser} = require("../controller/comment")
const express = require("express")
const multer = require("multer")
const commentRouter = express.Router()

//for cloudinary
const uploader = multer({
    storage: multer.diskStorage({}),
  })
  

commentRouter.route("/add-comment/:userId/:postId").post(addComment)
commentRouter.route("/get-comment-user-data/:commentId").get(commentUser)
commentRouter.route("/like-comment/:commentId/:userId").post(likeComment)
commentRouter.route("/unlike-comment/:commentId/:userId").post(unlikeComment)
commentRouter.route("/get-comment-like/:commentId").get(getCommentLikedUser)
commentRouter.route("/edit-users-comment/:commentId").patch(editComment)
commentRouter.route("/delete-users-comment/:commentId").delete(deleteComment)
commentRouter.route("/upload-pdf").post(uploader.single('pdf'), uploadPdf)



module.exports = commentRouter