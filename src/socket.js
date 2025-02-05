import { io } from "socket.io-client";

const SERVER_URL = "chat-app-v2-server-production.up.railway.app"; // Replace with your actual backend URL

export const socket = io(SERVER_URL, {
    transports: ["websocket"],
});
