import React, { useState } from "react";

const UsernameModal = ({ onSubmit }) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onSubmit(username);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Enter Your Username</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">Join Chat</button>
                </form>
            </div>
        </div>
    );
};

export default UsernameModal;
