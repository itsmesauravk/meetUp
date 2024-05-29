const addUserPost = require("../controller/post")
const express = require("express")
const routerPost = express.Router()
const multer = require("multer")


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

routerPost.post('/add-post/:id', upload.single('image'), addUserPost); 


module.exports = routerPost