import "dotenv/config"   // MUST be the very first import — loads .env before anything else runs
import express from "express"
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

const app = express()

const PORT = process.env.PORT || 5000

connectDB()
connectCloudinary()

// Trim trailing slashes / whitespace so URL mismatches don't silently break CORS
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map(url => url.trim().replace(/\/$/, ""))
  .filter(Boolean)

app.use(cookieParser())
app.use(express.json())

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl, Postman, server-to-server)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error("Not allowed by CORS: " + origin))
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.options(/.*/, cors())

app.get("/", (req, res) => {
  res.send("Hello ")
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})