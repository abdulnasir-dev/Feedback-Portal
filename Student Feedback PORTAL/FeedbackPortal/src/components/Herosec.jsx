import "../Style/Herosec.css";
import Card from "./Card.jsx";
import TrCard from "./TrCard.jsx";
import tr1 from "../assets/tr1.png";
import tr2 from "../assets/tr2.webp";
import tr3 from "../assets/tr3.png";
import api from "../api/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Herosec({ name }) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch courses/events from backend
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await api.get("/courses");

        // FIXED: backend returns array, not { courses: [] }
        setCourses(res.data);
      } catch (err) {
        console.log("Error loading courses:", err);
      }
    };

    loadCourses();
  }, []);

  // Navigate to Feedback Page
  const openFeedback = (courseId) => {
    navigate(`/feedback/${courseId}`);
  };

  return (
    <div className="herosec">
      {/* HERO SECTION */}
      <div className="welcome-hero">
        <div className="hero-overlay">
          <p className="hp1">{formattedDate}</p>
          <h1>
            Welcome back!<span className="uname"> {name}</span> 👋
          </h1>
          <p className="hp22">
            Stay updated with your courses and upcoming events
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* LEFT CONTENT */}
        <div className="left-content">
          {/* COURSES */}
          <div className="section-box">
            <h2>📘 Courses ››</h2>
            <div className="course-cards">
              {courses
                .filter((c) => c.type === "course")
                .map((c) => (
                  <Card
                    key={c._id}
                    course={c}
                    onFeedback={() => openFeedback(c._id)}
                  />
                ))}
            </div>
          </div>

          {/* EVENTS */}
          <div className="section-box">
            <h2>🎉 Events ››</h2>
            <div className="course-cards">
              {courses
                .filter((e) => e.type === "event")
                .map((e) => (
                  <Card
                    key={e._id}
                    course={e}
                    onFeedback={() => openFeedback(e._id)}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="right-content">
          <h2>👨‍🏫 Course Instructors</h2>
          <div className="trcard-container">
            <TrCard
              details={{
                name: "Rohan Boss",
                subject: "Mathematics",
                email: "nasur@school.edu",
                src: tr1,
              }}
            />
            <TrCard
              details={{
                name: "Shantanu F",
                subject: "Physics",
                email: "dskdksj@school.edu",
                src: tr2,
              }}
            />
            <TrCard
              details={{
                name: "Shreesha P",
                subject: "Chemistry",
                email: "qfwf@school.edu",
                src: tr3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
