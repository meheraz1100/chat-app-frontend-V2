import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UsernameModal = ({ setUsername }) => {
    const [inputUsername, setInputUsername] = useState("");

    const handleSubmit = () => {
        if (inputUsername.trim()) {
            setUsername(inputUsername);
        }
    };

    return (
        <Modal isOpen={true} contentLabel="Enter Username" style={styles.modal}>
            <h2>Enter Your Username</h2>
            <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="Enter username"
                style={styles.input}
            />
            <button onClick={handleSubmit} style={styles.button}>Join Chat</button>
        </Modal>
    );
};

const styles = {
    modal: {
        content: { top: "50%", left: "50%", right: "auto", bottom: "auto", marginRight: "-50%", transform: "translate(-50%, -50%)", padding: "20px", textAlign: "center" }
    },
    input: { padding: "10px", width: "80%", marginBottom: "10px" },
    button: { padding: "10px", cursor: "pointer" }
};

export default UsernameModal;
