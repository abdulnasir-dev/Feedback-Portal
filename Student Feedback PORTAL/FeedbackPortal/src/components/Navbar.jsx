import React, { useEffect, useState } from "react";
import "../Style/Navbar.css";
import Hamburger from "../assets/Hamburger.jpg";
import LOGO from "../assets/LOGO.png";
import DefaultUser from "../assets/Default-User.webp";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        const load = async () => {
          try {
            const res = await api.get("/feedbacks/mine");
            const first = res.data.feedbacks?.[0];
            if (first?.user) setUser(first.user);
          } catch {
            setUser(null);
          }
        };
        load();
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={LOGO} alt="Logo" className="logo-image" />

                    {/* HAMBURGER MENU */}
                    <img
                      src={Hamburger}
                      alt="menu"
                      className="humb-image"
                      onClick={toggleSidebar}
                    />
                </div>

                {/* DESKTOP NAV LINKS */}
                <div className="navElements">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/response">My Feedback</Link>
                    <Link to="/account">Account</Link>
                </div>

                {/* ACCOUNT SECTION */}
                <div className="acc">
                    <Link to="/account">
                        <img src={DefaultUser} alt="user" className="account-image" />
                    </Link>

                    <span className="acc-s">
                        <p>{user ? user.name : "Guest"}</p>
                        <p>{user?.year || "Student"}</p>
                    </span>

                    {user ? (
                      <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    ) : (
                      <Link to="/login"><button className="login-btn">Login</button></Link>
                    )}
                </div>
            </nav>

            {/* SIDEBAR */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <img src={LOGO} alt="logo" className="sidebar-logo" />
                    <button className="close-btn" onClick={toggleSidebar}>×</button>
                </div>

                <div className="sidebar-links">
                    <Link to="/" onClick={toggleSidebar}>🏠 Dashboard</Link>
                    <Link to="/response" onClick={toggleSidebar}>📄 My Feedback</Link>
                    <Link to="/about" onClick={toggleSidebar}>ℹ️ About</Link>
                    <Link to="/account" onClick={toggleSidebar}>⚙️ Account Settings</Link>
                </div>
            </div>

            {/* BACKDROP */}
            {sidebarOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
        </>
    );
}
