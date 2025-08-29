import express from "express"
import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config()

connectDB()
    .catch(error => {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    })

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`)
})







