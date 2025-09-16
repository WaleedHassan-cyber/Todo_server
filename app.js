import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose"
import apiRoute, { protectedRoute } from "./routes/api.js";
// import { DB_CONNECT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors'
import serverless from "serverless-http";




const app = express();
const PORT =  process.env.PORT ||8000;

//DB Coonection
// mongoose.connect(DB_CONNECT)
mongoose.connect(process.env.DB_CONNECT).then(() => console.log("Connected to MongoDB")).catch((error) => console.error("MongoDB connection error:", error));
  

// Basics Calls
const corsOptions = {
    origin: process.env.CLIENT_URL ||'https://todo-client-dusky.vercel.app', // Allow your frontend's origin
    allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));  // prelight error
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// backend test Routes
app.get('/',(req, res) => {
    res.status(200).json({ message: "found" });
});
   
// Main Routes
app.use("/api",apiRoute);
app.use("/api",AuthMiddleware,protectedRoute);

export const handler = serverless(app);