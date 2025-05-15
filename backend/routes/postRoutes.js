import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import upload from "../config/multer.js"
import { deletePost, getAllPosts, getPostById, uploadPost } from "../controllers/postController.js"

const router = express.Router()

router.post("/upload-post",userAuth,upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "dropdownImages", maxCount: 20 }
  ]),uploadPost);
router.get("/get-all-posts",userAuth,getAllPosts)
router.get("/:id",userAuth,getPostById)
router.delete("/:id",userAuth,deletePost)

export default router