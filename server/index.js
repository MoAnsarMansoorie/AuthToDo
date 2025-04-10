import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"
import authRoute from "./routes/authRoute.js"
import cors from "cors"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// database connection calling here
connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use("/api/auth", authRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})