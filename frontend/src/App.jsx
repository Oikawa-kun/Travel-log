import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateLog from "./pages/Createlog";
import LogDetail from "./pages/LogDetail";
import EditLog from "./pages/EditLog";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import About from "./pages/About";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-log" element={<CreateLog />} />
          <Route path="/logs/:id" element={<LogDetail />} />
          <Route path="/edit-log/:id" element={<EditLog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
