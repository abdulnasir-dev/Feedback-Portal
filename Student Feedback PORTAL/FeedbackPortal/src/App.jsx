import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Herosec from "./components/Herosec";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import About from "./pages/About";
import Response from "./pages/Response";
import Feedback from "./pages/Feedback";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Herosec name="Abdul Nasir" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/response" element={<Response />} />
        <Route path="/feedback/:id" element={<Feedback />} />

      </Routes>
      <Footer />
    </Router>
  );
}
