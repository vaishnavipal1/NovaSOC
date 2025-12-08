import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import ingestRoutes from "./routes/ingest.routes";
import { initSocket } from "./sockets/socket";
import incidentsRoutes from "./routes/incidents.routes";
import logsRoutes from "./routes/logs.routes";
import { generateRandomLog } from "./services/autoGenerator.service";
import analyticsRoutes from "./routes/analytics.routes";
import blocklistRoutes from "./routes/blocklist.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ingest", ingestRoutes);

app.use("/api/incidents", incidentsRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/blocklist", blocklistRoutes);




// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io
initSocket(server);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("🟢 Connected to MongoDB");
  } catch (err: any) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
connectDB();

// Register routes


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start backend
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
});


const interval = process.env.AUTO_LOG_INTERVAL || 600000;

setInterval(generateRandomLog, Number(interval));
