// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;
require("dotenv").config()


// Ensure environment variables are loaded
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary environment variables are not set. Make sure to set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
    process.exit(1);
}

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload a file
const uploadFilePath = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath,{
            folder:'User_Post',
            resource_type:'auto'
        });
        console.log('File uploaded successfully:', result);
        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
};

module.exports = { uploadFilePath };

