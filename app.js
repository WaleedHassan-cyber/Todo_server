import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import apiRoute, { protectedRoute } from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

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

// ✅ Local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`🚀 Server is running on ${PORT}`));
}

// ✅ Vercel (must be default export)
export default app;
export const handler = serverless(app);
