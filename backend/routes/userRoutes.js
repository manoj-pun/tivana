import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import { getUserData } from "../controllers/userController.js"

const router = express.Router()

router.get("/user-data",userAuth,getUserData);

export default router