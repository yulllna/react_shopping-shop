import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file);
      return result;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };