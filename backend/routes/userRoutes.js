import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import { editProfile, getUserByUsername, getUserData, likePost, removeProfileImage, savePost, unlikePost, unsavePost, uploadProfileImage } from "../controllers/userController.js"
import upload from "../config/multer.js"

const router = express.Router()

router.post("/upload-profile-image",userAuth,upload.single("profileImage"),uploadProfileImage);
router.get("/user-data",userAuth,getUserData);
router.put("/edit-profile",userAuth,upload.single("profileImage"),editProfile);
router.delete("/remove-profile-image",userAuth,removeProfileImage);
router.get("/:username",userAuth,getUserByUsername);
router.post("/like-post/:postId", userAuth, likePost);
router.post("/unlike-post/:postId", userAuth, unlikePost);
router.post("/save-post/:postId", userAuth, savePost);
router.post("/unsave-post/:postId", userAuth, unsavePost);

export default router