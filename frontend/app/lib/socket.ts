// frontend/app/lib/socket.ts
import { io } from "socket.io-client";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:4000";
const socket = io(BACKEND, { autoConnect: true, transports: ["websocket", "polling"] });

export default socket;
