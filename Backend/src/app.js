import express from "express"


const app = express()

//common middlewares
app.use(express.json())




app.get("/", (req, res) => {
    res.status(200).send("Server is running")
})

//import routes
import authRoutes from "./routes/auth.routes.js"

//use routes
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

export default app