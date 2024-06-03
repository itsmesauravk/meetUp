const express = require('express');
const multer = require('multer');
const routerPost = express.Router();
const {addPost, getPostUserDetails, editPost, deletePost, getPostDetails} = require('../controller/post');


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

// for getting all posts
routerPost.route("/get-all-posts").get(getPostUserDetails)
//for getting the specific post
routerPost.route("/get-specific-post/:id").get(getPostDetails)


module.exports = routerPost;
