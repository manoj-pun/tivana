import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js"

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()

connectCloudinary()

app.use(cookieParser());
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})