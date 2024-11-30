import express from "express";
import mongoose from "mongoose"
import apiRoute, { protectedRoute } from "./routes/api.js";
// import { DB_CONNECT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();




const app = express();
const PORT = 8000;

//DB Coonection
// mongoose.connect(DB_CONNECT)
mongoose.connect(process.env.DB_CONNECT).then(() => console.log("Connected to MongoDB")).catch((error) => console.error("MongoDB connection error:", error));
  

// Basics Calls
const corsOptions = {
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));  // prelight error
// app.use(cors())
app.use(express.json())

// backend test Routes
app.get("/",(req,res)=>{
    res.json({"message":"Chal raha ha bhai"})
})

    
// Main Routes
app.use("/api",apiRoute);
app.use("/api",AuthMiddleware,protectedRoute);


app.listen(PORT,()=> console.log("Server is Running"))