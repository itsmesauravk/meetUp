const express = require('express');
const multer = require('multer');
const routerPost = express.Router();
const {addPost, getPostUserDetails, editPost, deletePost} = require('../controller/post');


// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Init upload
const upload = multer({ storage });

// Ensure the field name is 'photo' here
routerPost.post('/new-post/:id', upload.single('photo'), addPost);
//for editing the post
routerPost.route("/edit-post/:id").patch(upload.single('photo'),editPost)
routerPost.route("delete-post/:id").delete(deletePost)

// for getting user data while adding the post
routerPost.route("/get-user-data/:id").get(getPostUserDetails)


module.exports = routerPost;
