import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./config/db.js"
import apps from "./app.js"
const app = express()
dotenv.config()
db()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
app.use(apps)
app.use("/test", (req, res) => {
    return res.status(200).json("Welcome to the Food Server")
})

app.listen(PORT, () => {
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    console.log(`My Server is Started Running on the ${PORT}!!!`);
})