import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import { editProfileInfo, getUserData, uploadProfilePicture } from "../controllers/userController.js"
import upload from "../config/multer.js"

const router = express.Router()

router.post("/upload-profile-picture",userAuth,upload.single("profileImage"),uploadProfilePicture);
router.get("/user-data",userAuth,getUserData);
router.post("/edit-profile-info",userAuth,upload.single("profileImage"),editProfileInfo);

export default router