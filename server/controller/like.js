const addUserLike = require("../schema/likeSchema")


const likeComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.body.userId;

        const comment = await addUserLike.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        if (!comment.likedBy.includes(userId)) {
            comment.likesCount += 1;
            comment.likedBy.push(userId);
            await comment.save();
            return res.status(200).json({ success: true, message: 'Comment liked', likesCount: comment.likesCount });
        } else {
            return res.status(400).json({ success: false, message: 'User already liked the comment' });
        }
    } catch (error) {
        console.error('Error liking comment:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while liking the comment.', error: error.message });
    }
};

// Unlike a comment
const unlikeComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.body.userId;

        const comment = await addUserLike.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        const index = comment.likedBy.indexOf(userId);
        if (index > -1) {
            comment.likesCount -= 1;
            comment.likedBy.splice(index, 1);
            await comment.save();
            return res.status(200).json({ success: true, message: 'Comment unliked', likesCount: comment.likesCount });
        } else {
            return res.status(400).json({ success: false, message: 'User has not liked the comment' });
        }
    } catch (error) {
        console.error('Error unliking comment:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while unliking the comment.', error: error.message });
    }
};

module.exports = {likeComment,unlikeComment}