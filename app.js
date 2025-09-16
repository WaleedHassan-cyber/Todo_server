import dotenv from "dotenv";
dotenv.config();
import express from "express";
import apiRoute, { protectedRoute } from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

// MongoDB Connectiona
const connectDB = require("./db/connection.js");
connectDB()

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL || "https://todo-client-dusky.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "found" });
});

// Routes
app.use("/api", apiRoute);
app.use("/api", AuthMiddleware, protectedRoute);



// ✅ Vercel export
export default serverless(app);
