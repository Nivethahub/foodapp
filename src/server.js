import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bcrypt from "bcryptjs"
import db from "./config/db.js"
import routes from "./routes/authRoutes.js"
import userroutes from "./routes/userRoutes.js"
const app = express()
dotenv.config()
db()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(userroutes)
const PORT = process.env.PORT
app.use("/test", (req, res) => {
    return res.status(200).json("Welcome to the Food Server")
})
app.listen(PORT, () => {
    console.log(`My Server is Started Running on the ${PORT}!!!`);
})