import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

//common middlewares
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Server is running")
})

export default app