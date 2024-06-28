import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import NewGame from "./NewGame";
import { ProfilePicProvider } from "./ProfilePicContext";

function App() {
  return (
    <ProfilePicProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/game" element={<NewGame />} />
        </Routes>
      </div>
    </ProfilePicProvider>
  );
}

export default App;
