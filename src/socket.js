import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:4000/"; // Replace with your actual backend URL

export const socket = io(SERVER_URL, {
    transports: ["websocket"],
});
