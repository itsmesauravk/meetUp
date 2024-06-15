const postData = require("../schema/postSchema")

//cloudinary upload
const {uploadFilePath} = require("../middleware/uploadFile")


const addPost = async (req, res) => {
    try {
        if (!req.file.path) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const { caption } = req.body;
        const userId = req.params.id;
        const imagePath = req.file.path.replace(/\\/g, "/");

        // Uploading image 
        const result = await uploadFilePath(imagePath);
        const { secure_url } = result;

        const addUserPost = await postData.create({
            caption: caption,
            image: secure_url,
            user: userId
        });

        if (addUserPost) {
            return res.status(200).json({ success: true, message: 'Your post has been added successfully', addUserPost });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to add post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const likePost = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;

        const post = await postData.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({ success: true, message: "Post liked successfully", post });
    } catch (error) {
        console.error("Error liking post:", error);
        return res.status(500).json({ success: false, message: "An error occurred while liking the post.", error: error.message });
    }
};

const unlikePost = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;

        const post = await postData.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        post.likes = post.likes.filter(id => id.toString() !== userId);

        await post.save();

        return res.status(200).json({ success: true, message: "Post unliked successfully", post });
    } catch (error) {
        console.error("Error unliking post:", error);
        return res.status(500).json({ success: false, message: "An error occurred while unliking the post.", error: error.message });
    }
};

const getLikedUsers = async (req, res) => {
    try {
        const postId = req.params.postId;

        const post = await postData.findById(postId).populate('likes');

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        return res.status(200).json({ success: true, likes: post.likes });
    } catch (error) {
        console.error("Error fetching liked users:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching liked users.", error: error.message });
    }
};



const getPostUserDetails = async(req,res) =>{
  try {
    const showUserData = await postData.find({}).populate("user").sort({createdAt:-1})
    // console.log(showUserData)
    if(!showUserData){
      return res.status(404).json({success:false,message:"Unable to show user"})
    }else{
      return res.status(200).json({success:true,showUserData})
    }
  } catch (error) {
    return res.status(400).json({success:false,message:"error",error})
  }
}

const getPostDetails = async (req, res) => {
  try {
    const postId = req.params.id;
    const showPostDetail = await postData.findById(postId).populate("user");
    if (!showPostDetail) {
      return res.status(404).json({ success: false, message: "Post not found" });
    } else {
      return res.status(200).json({ success: true, showPostDetail });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

const editPost = async(req,res) =>{
  try {
    const {caption} = req.body;
    const imagePath = req.file.path
    const postId = req.params.id;

    // console.log(postId)


        //uploading image 
    const result = await uploadFilePath(imagePath);
        // console.log(result)
    const {secure_url} = result;

    const editUserPost = await postData.findByIdAndUpdate(postId,{caption:caption,image:secure_url})
    if(!editUserPost){
      return res.status(404).json({success:false,message:"Unable to edit."})
    }else{
      return res.status(200).json({success:true,message:"Edited successfully.",post:editUserPost})
    }
  } catch (error) {
    return res.status(400).json({success:false,message:"error",error})
  }
}

const deletePost = async (req, res) => {
  try {
    const postId  = req.params.id;
    // console.log(postId)
    const deleteUserPost = await postData.deleteOne({ _id: postId });

    if (deleteUserPost.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Unable to delete the post." });
    } else {
      return res.status(200).json({ success: true, message: "Deleted successfully." });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: "error", error }); 
  }
};


module.exports = {addPost, likePost, unlikePost, getLikedUsers,getPostUserDetails,editPost,deletePost,getPostDetails}