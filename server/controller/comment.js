const addUserComment = require("../schema/commentSchema")

const addComment = async (req, res) => {
    try {
        const userId = req.params.id;
        const postId = req.params.id;
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


const commentUser = async(req,res) =>{
    try {
        const getCommentUser = await addUserComment.find({}).populate("user").populate("post").sort({createdAt:-1})
        if(!getCommentUser){
            return res.status(404).json({success:false,message:"Unable to get the user data"})
        }else{
            return res.status(200).json({success:true,message:"Loaded user detail",getCommentUser})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

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
        const commentId = req.params.id;
        const deleteUsersComment = addUserComment.deleteOne({_id:commentId})
        if(!deleteUsersComment){
            return res.status(404).json({success:false,message:"Unable to delete the comment"})
        }else{
            return res.status(200).json({success:true, message:"Deleted successfully"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:error})
    }
}

module.exports = {addComment,commentUser,editComment,deleteComment}