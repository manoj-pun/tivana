import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import { editProfile, getUserData, removeProfileImage, uploadProfileImage } from "../controllers/userController.js"
import upload from "../config/multer.js"

const router = express.Router()

router.post("/upload-profile-image",userAuth,upload.single("profileImage"),uploadProfileImage);
router.get("/user-data",userAuth,getUserData);
router.post("/edit-profile",userAuth,upload.single("profileImage"),editProfile);
router.delete("/remove-profile-image",userAuth,removeProfileImage);

export default router