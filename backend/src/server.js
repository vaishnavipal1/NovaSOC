import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import logRouter from "./routes/ingestLogs.js";
import incidentsRouter from "./routes/incidents.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// 🔴 Use the SAME DB name you used in mongosh:  novalogdb
mongoose
  .connect("mongodb://127.0.0.1:27017/novalogdb")
  .then(() => console.log("🛢 MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/incidents", incidentsRouter);


// ✅ All log routes will start with /api/logs
app.use("/api/logs", logRouter);

server.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);


