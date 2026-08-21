import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000

import express from "express"
const app = express()

import mongoose from "mongoose"

import connectDB from "./config/db"
connectDB()

import authroute from "./routes/auth.route"
// Middleware
app.use(express.json())
app.use("/api/auth", authroute)

// Url of the Project
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})