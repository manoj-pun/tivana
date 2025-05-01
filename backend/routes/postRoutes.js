import express from "express";
import { uploadPost } from "../controllers/postController.js";
import upload from "../config/multer.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload-post", userAuth, upload.single("image"), uploadPost);

export default router;
