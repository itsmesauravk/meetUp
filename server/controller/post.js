const postData = require("../schema/postSchema")

const addPost = async(req,res) =>{
    try {
        if (!req.file.path) {
          return res.status(400).json({ message: 'No image uploaded' });
        }
    
        const { caption} = req.body;
        const userId = req.params.id;
        console.log(userId)
        const imagePath = req.file.path.replace(/\\/g, "/");
        
    
        const addUserPost = await postData.create({
          caption: caption,
          image: imagePath,
          user: userId   
        });
    
        if (addUserPost) {
          return res.status(200).json({success:true, message: 'Your post has been added successfully', addUserPost });
        } else {
          return res.status(500).json({success:false, message: 'Failed to add post' });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }

}

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

const editPost = async(req,res) =>{
  try {
    const {caption} = req.body;
    const imagePath = req.file.path
    const {postId} = req.params

    const editUserPost = await postData.findByIdAndUpdate(postId,{caption:caption,imagePath:imagePath})
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
    const { postId } = req.params;
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


module.exports = {addPost,getPostUserDetails,editPost,deletePost}