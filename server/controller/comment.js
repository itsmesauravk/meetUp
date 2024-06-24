const addUserComment = require("../schema/commentSchema")

const {uploadFilePath} = require("../middleware/uploadFile")


const addComment = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({ success: false, message: "Comment is required." });
        }

        const addUComment = await addUserComment.create({
            comment: comment,
            post: postId,
            user: userId
        }); 

        return res.status(201).json({ success: true, message: "Comment added successfully", addUComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ success: false, message: "An error occurred while adding the comment.", error: error.message });
    }
}

const likeComment = async (req, res) => {
    try {
        const userId = req.params.userId;
        const commentId = req.params.commentId

        const likeComment = await addUserComment.findById(commentId);

        if (!likeComment) {
            return res.status(404).json({ success: false, message: "Comment not found." });
        }

        if (!likeComment.commentLike.includes(userId)) {
            likeComment.commentLike.push(userId);
        }

        await likeComment.save();

        return res.status(200).json({ success: true, message: "Post liked successfully", likeComment });
    } catch (error) {
        console.error("Error liking comment:", error);
        return res.status(500).json({ success: false, message: "An error occurred while liking the post.", error: error.message });
    }
};

const unlikeComment = async (req, res) => {
    try {
        const userId = req.params.userId;
        const commentId = req.params.commentId;

        const comment = await addUserComment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        comment.commentLike = comment.commentLike.filter(id => id.toString() !== userId);

        await comment.save();

        return res.status(200).json({ success: true, message: "Post unliked successfully", comment });
    } catch (error) {
        console.error("Error unliking post:", error);
        return res.status(500).json({ success: false, message: "An error occurred while unliking the post.", error: error.message });
    }
};


const getCommentLikedUser = async(req,res) =>{
    try {
        const commentId = req.params.commentId

        if(!commentId){
            return res.status(400).json({success:false,message:"Comment Id not found"})
        }

        const getLike = await addUserComment.findById(commentId).populate("commentLike")
        if(!getLike){
            return res.status(404).json({success:false,message:"Unable to get like"})
        }

        return res.status(200).json({success:true, getLike})
    } catch (error) {
        return res.status(400).json({success:false,error})
    }
}



const commentUser = async (req, res) => {
    try {
        const postId = req.params.commentId; 
        
       

        // console.log(postId, userId);
    
        const comments = await addUserComment.find({ post: postId })
            .populate("user")
            .sort({ createdAt: -1 });
        
        if (!comments) {
            return res.status(404).json({ success: false, message: "No comments found for the given post" });
        }
    
        return res.status(200).json({ success: true, message: "Loaded user comments", comments });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const editComment = async(req,res) =>{
    try {
        const commentId = req.params.id;
        const {comment} = req.body;

        const editCommentUser = await addUserComment.findByIdAndUpdate(commentId,{comment:comment},{new:true})
        if(!editCommentUser){
            return res.status(404).json({success:false,message:"Unable to edit the comment"})
        }else{
            return res.status(200).json({success:true,editCommentUser})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const deleteComment = async(req,res) =>{
    try {
        const commentId = req.params.commentId;
        const deleteUsersComment = await addUserComment.findByIdAndDelete(commentId)
        if(!deleteUsersComment){
            return res.status(404).json({success:false,message:"Unable to delete the comment"})
        }else{
            return res.status(200).json({success:true, message:"Deleted successfully"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:error})
    }
}


// upload pdf

const uploadPdf = async(req,res)=>{

    try {
        const pdf = req.file.path;
        console.log(pdf)
        if(!pdf){
            return res.status(400).json({success:false,message:"Please select a PDF file to upload."})
        }

        const upload = uploadFilePath(pdf);

        if(!upload){
            return res.status(400).json({success:false,message:"Error uploading PDF."})
        }else{
            return res.status(200).json({success:true,message:"PDF uploaded successfully."})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error."})
    }

}

module.exports = {addComment,commentUser,editComment,deleteComment, uploadPdf, likeComment, unlikeComment, getCommentLikedUser}