// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import analystRoutes from "./Routes/analystRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// simple test route
app.get("/", (req, res) => {
  res.send("SOC Backend Running...");
});

// ROUTES
app.use("/api/analysts", analystRoutes); // GET/POST/DELETE analysts
app.use("/api/auth", authRoutes);        // 👈 /api/auth/login lives here

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
