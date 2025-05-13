import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import upload from "../config/multer.js"
import { getAllPosts, uploadPost } from "../controllers/postController.js"

const router = express.Router()

router.post("/upload-post",userAuth,upload.single("thumbnailImage"),uploadPost)
router.get("/get-all-posts",userAuth,getAllPosts)

export default router