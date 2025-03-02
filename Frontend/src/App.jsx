import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Register/SignUp";
import Landing from "./Components/LandingPage/Landing";
import About from "./Components/About/About";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
