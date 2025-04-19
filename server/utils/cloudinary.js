import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({ 
  cloud_name:process.env.CLOUDE_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

export const uploadMedia =async(file)=>{
    try {
        const uploadResponse = await cloudinary.uploader.upload(file,{
            resource_type: "auto"
        });
        return uploadResponse;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
    throw new Error("Failed to upload media");
    }
};

export const  deleteImage = async(publicId)=>{
    try {
       const result = await cloudinary.uploader.destroy(publicId);
       return result;
    } catch (error) {
        console.error("Cloudinary image delete error:", error.message);
        throw new Error("Failed to delete image");
    }
};

export const deleteVideo = async(publicId)=>{
    try {
       const result = await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
       return result;
    } catch (error) {
        console.error("Cloudinary video delete error:", error.message);
        throw new Error("Failed to delete video");
    }
};