import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()

connectCloudinary()

const allowedOrigins = ["http://localhost:5173"]

app.use(cookieParser());
app.use(express.json())
app.use(cors({origin:allowedOrigins, credentials:true}))

app.get("/",(req,res) => {
    res.send("Hello ")
})

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})