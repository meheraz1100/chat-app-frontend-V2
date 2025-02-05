import { useEffect, useState } from "react";
import { socket } from "../socket";
import Message from "./Message";
import UsernameModal from "./UsernameModal";
import "../styles/App.css";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        socket.on("chat history", (history) => {
            setMessages(history); // Load only messages of existing users
        });

        socket.on("chat message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("chat message");
            socket.off("chat history");
        };
    }, []);

    const handleUsernameSubmit = (name) => {
        setUsername(name);
        socket.emit("set username", name);
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chat message", message);
            setMessage("");
        }
    };

    if (!username) {
        return <UsernameModal onSubmit={handleUsernameSubmit} />;
    }

    return (
        <div className="chat-container">
            <h2>Welcome, {username}!</h2>
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
