import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Herosec from "./components/Herosec";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";
import About from "./Pages/About";
import Response from "./Pages/Response";
import Feedback from "./Pages/Feedback";
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
