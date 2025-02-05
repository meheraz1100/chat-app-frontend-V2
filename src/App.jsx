import React, { useState } from "react";
import Chat from "./components/Chat";
import UsernameModal from "./components/UsernameModal";

function App() {
    const [username, setUsername] = useState("");

    return (
        <div className="App">
            {!username ? (
                <UsernameModal setUsername={setUsername} />
            ) : (
                <Chat username={username} />
            )}
        </div>
    );
}

export default App;
