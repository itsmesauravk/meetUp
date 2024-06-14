const express = require('express');
const multer = require('multer');
const routerPost = express.Router();
const {addPost, getPostUserDetails, editPost, deletePost, getPostDetails, likePost, unlikePost, getLikedUsers} = require('../controller/post');

//for cloudinary
const uploader = multer({
  storage: multer.diskStorage({}),
})

// Ensure the field name is 'photo' here
routerPost.post('/new-post/:id', uploader.single('photo'), addPost);
//for editing the post
routerPost.route("/edit-post/:id").patch(uploader.single('photo'),editPost)
routerPost.route("/delete-post/:id").delete(deletePost)

// for post like and unlike
routerPost.post('/posts/:postId/like/:userId', likePost);
routerPost.post('/posts/:postId/unlike/:userId', unlikePost);
routerPost.get('/posts/:postId/likes', getLikedUsers);


// for getting all posts
routerPost.route("/get-all-posts").get(getPostUserDetails)
//for getting the specific post
routerPost.route("/get-specific-post/:id").get(getPostDetails)


module.exports = routerPost;
