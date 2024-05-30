const express = require('express');
const multer = require('multer');
const routerPost = express.Router();
const {addPost, getPostUserDetails} = require('../controller/post');


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

// for getting all posts
routerPost.route("/get-all-posts").get(getPostUserDetails)

module.exports = routerPost;
