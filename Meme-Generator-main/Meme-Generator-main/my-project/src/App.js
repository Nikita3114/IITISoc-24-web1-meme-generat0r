import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Loading from './Components/Loading';
import Game from './Components/Game';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoutes'; // Import ProtectedRoute
import { AuthProvider } from './AuthContext'; // Import AuthProvider

export default function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loading" element={<ProtectedRoute element={Loading} />} />
          <Route path="/game" element={<ProtectedRoute element={Game} />} />
          <Route path="/homepage" element={<ProtectedRoute element={Homepage} />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
