import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import NewGame from "./NewGame";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/game" element={<NewGame />} />
      </Routes>
    </div>
  );
}

export default App;
