// backend/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import analystRoutes from "./Routes/analystRoutes.ts";
import authRoutes from "./Routes/authRoutes.ts";
import logsRoutes from "./src/routes/logs.routes.ts";
import incidentsRoutes from "./src/routes/incidents.routes.ts";
import analyticsRoutes from "./src/routes/analytics.routes.ts";

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
app.use("/api/auth", authRoutes); // 👈 /api/auth/login lives here
app.use("/api/logs", logsRoutes); // GET logs
app.use("/api/incidents", incidentsRoutes); // GET/PATCH incidents
app.use("/api/analytics", analyticsRoutes); // GET analytics & stats

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
