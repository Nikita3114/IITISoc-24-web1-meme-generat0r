import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage"
import Loading from "./Components/Loading";
import Game from "./Components/Game";
// import Game from "./Components/Check";

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
  )
}
