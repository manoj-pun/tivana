import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import { getUserData, uploadProfilePicture } from "../controllers/userController.js"
import upload from "../config/multer.js"

const router = express.Router()

router.post("/upload-profile-picture",userAuth,upload.single("profile"),uploadProfilePicture)
router.get("/user-data",userAuth,getUserData);

export default router