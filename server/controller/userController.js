import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { deleteImage, uploadMedia } from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(404).json({
                message:"Something is missing",
                success: false
            });
        };

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        };

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
        });

        // Save to database
        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"1d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure:true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
          });

          res.status(201).json({ message: "User registered successfully", newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

      
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

      
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
 
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Login Error" });
    }
};

export const logoutUser = (req, res) => {
    try {
 
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge:0 
        });

        res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Logout Error" });
    }
};

export const getUserProfile = async(req, res)=>{
    try {
        const userId = req.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        console.log("Get user profile server error");
        res.status(500).json({ message: "Internal Server get profile Error" });
    }
};

export const updateUser = async(req, res)=>{
    try {
        const {name} = req.body;
        const file = req.file;
        
        const userId = req.user;
        
        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({
                message: "Update user not found",
                success: true
            });
        };

        if(file){
            if(user.image && user.image.public_id){
                await deleteImage(user.image.public_id)
            }
        };

        if(name) user.name = name;

        const cloudResponse = await uploadMedia(file.path);
        
        
        user.image={
            public_id: cloudResponse.public_id,
            url: cloudResponse.secure_url
        };

        const updateUserData = await user.save();

        res.status(200).json({
            message: "User updated successfully",
            success: true,
            user: updateUserData,
          });

    } catch (error) {
        console.error(error.message);
        console.log("Get user profile update server error");
        res.status(500).json({ message: "Internal Server profile update Error" });
    }
};