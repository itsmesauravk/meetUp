const {addComment, commentUser, editComment, deleteComment, uploadPdf} = require("../controller/comment")
const express = require("express")
const multer = require("multer")
const commentRouter = express.Router()

//for cloudinary
const uploader = multer({
    storage: multer.diskStorage({}),
  })
  

commentRouter.route("/add-comment/:userId/:postId").post(addComment)
commentRouter.route("/get-comment-user-data/:postId").get(commentUser)
commentRouter.route("/edit-users-comment/:id").patch(editComment)
commentRouter.route("/delete-users-comment/:id").delete(deleteComment)
commentRouter.route("/upload-pdf").post(uploader.single('pdf'), uploadPdf)



module.exports = commentRouter