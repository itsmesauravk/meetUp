const addUserComment = require("../schema/commentSchema")

const addComment = async(req,res) =>{
    try {
        const userId = req.params.id;
        const comment = req.body;

        const addUComment = await addUserComment.create({
            comment : comment,
            user: userId
        })
        if(!addUComment){
            return res.status(404).json({success:false,message:"Unable to add the comment."})
        }else{
            return res.status(200).json({success:true, message:"added successfully", addUComment})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const commentUser = async(req,res) =>{
    try {
        const getCommentUser = await addUserComment.find({}).populate("user").sort({createdAt:-1})
        if(!getCommentUser){
            return res.status(404).json({success:false,message:"Unable to get the user data"})
        }else{
            return res.status(200).json({success:true,message:"Loaded user detail",getCommentUser})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

module.exports = {addComment,commentUser}