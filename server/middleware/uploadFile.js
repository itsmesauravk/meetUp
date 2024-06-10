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

//for getting the usage statistics

// const getUsageStats = async () => {
//     try {
//       const result = await cloudinary.api.usage();
//       console.log('Cloudinary Usage Statistics:', result);
//       return result;
//     } catch (error) {
//       console.error('Error fetching Cloudinary usage statistics:', error);
//       throw error;
//     }
//   };
  
//   // Example usage
//   getUsageStats().then(stats => {
//     // Process the stats as needed
//     console.log('Credit usage count based on stats:', stats);
//   });




// Function to upload a file
const uploadFilePath = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        // console.log('File uploaded successfully:', result);
        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
};

module.exports = { uploadFilePath };

