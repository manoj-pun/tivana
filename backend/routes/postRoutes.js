import express from "express";
import { getPosts, uploadPost } from "../controllers/postController.js";
import upload from "../config/multer.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload-post", userAuth, upload.fields([
    {name:"thumbnailImage",maxCount:1},
    {name:"dropdownImages",maxCount:10}
]), uploadPost);//This will upload single and multiple images for same path
// router.post("/upload-post", userAuth, upload.array("dropdownImages"), uploadPost); This is for uploading multiple images
router.get("/get-posts",userAuth,getPosts);

export default router;
