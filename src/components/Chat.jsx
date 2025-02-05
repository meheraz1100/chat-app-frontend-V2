import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Replace with your server URL

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        // Send username to the server
        socket.emit("set username", username);

        // Receive chat history (only if the user has previous messages)
        socket.on("chat history", (history) => {
            setMessages(history);
        });

        // Listen for new messages
        socket.on("chat message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("chat history");
            socket.off("chat message");
        };
    }, [username]);

    const sendMessage = () => {
        if (input.trim() !== "") {
            socket.emit("chat message", input);
            setInput("");
        }
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div key={index} style={msg.type === "notification" ? styles.notification : styles.message}>
                        {msg.type === "message" && <strong>{msg.username}: </strong>}
                        {msg.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.button}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    chatContainer: { width: "100%", maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" },
    chatBox: { border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px", marginBottom: "10px" },
    message: { textAlign: "left", padding: "5px", borderBottom: "1px solid #ddd" },
    notification: { textAlign: "center", color: "gray", fontStyle: "italic", padding: "5px" },
    inputContainer: { display: "flex", gap: "10px" },
    input: { flexGrow: 1, padding: "5px" },
    button: { padding: "5px 10px", cursor: "pointer" }
};

export default Chat;
