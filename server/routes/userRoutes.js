import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUser } from "../controller/userController.js";
import { isLoggedIn } from "../middlewere/isLoggedIn.js";
import upload from "../utils/multer.js";
 
 
const router = express.Router();

router.route("/register-user").post(registerUser)
router.route("/login-user").post(loginUser)
router.route("/logout-user").get(isLoggedIn,logoutUser)
router.route("/get-user").get(isLoggedIn,getUserProfile)
router.route("/update-user").put(isLoggedIn,upload.single("image"), updateUser)

export default router;