import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import upload from "../config/multer.js"
import { deletePost, getAllPosts, getPostById, uploadPost } from "../controllers/postController.js"

const router = express.Router()

router.post("/upload-post",upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "dropdownImages", maxCount: 100 }
  ]),uploadPost);
router.get("/get-all-posts",getAllPosts)
router.get("/:id",getPostById)
router.delete("/:id",deletePost)

export default router