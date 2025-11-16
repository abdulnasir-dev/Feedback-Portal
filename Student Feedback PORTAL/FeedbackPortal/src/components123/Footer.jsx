import React from "react";
import "../Style/Footer.css";
import LOGO from "../Assets/LOGO.png";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
         
        <p>© 2025 Student Feedback Portal. All rights reserved.</p>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
