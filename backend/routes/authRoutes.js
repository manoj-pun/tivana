import express from "express"
import { isAuthenticated, loginUser, logoutUser, registerUser } from "../controllers/authController.js"
import userAuth from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/register-user",registerUser)
router.post("/login-user",loginUser)
router.post("/logout-user",logoutUser)
router.get("/is-auth",userAuth,isAuthenticated)

export default router