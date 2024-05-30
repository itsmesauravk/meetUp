const postData = require("../schema/postSchema")

const addPost = async(req,res) =>{
    try {
        if (!req.file.path) {
          return res.status(400).json({ message: 'No image uploaded' });
        }
    
        const { caption} = req.body;
        const userId = req.params.id;
        const imagePath = req.file.path;

        console.log(caption,userId,imagePath)
        
    
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

module.exports = addPost