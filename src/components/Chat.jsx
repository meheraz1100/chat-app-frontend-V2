import  { useEffect, useState } from "react";
import { socket } from "../socket";
import Message from "./Message";
import "../styles/App.css";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = prompt("Enter your username:");
        setUsername(user);
        socket.emit("set username", user);

        socket.on("chat history", (history) => {
            setMessages(history);
        });

        socket.on("chat message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("chat message");
            socket.off("chat history");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chat message", message);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat App</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <Message key={index} username={msg.username} text={msg.text} />
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
