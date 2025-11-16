import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Style/Feedback.css";
import api from "../api/api";

export default function FeedbackPage() {
  const { id } = useParams();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [course, setCourse] = useState(null);

  // Fetch course details
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await api.get("/courses");
        const found = res.data.courses.find((c) => c._id === id);
        setCourse(found);
      } catch (err) {
        console.log("Error loading course:", err);
      }
    };

    loadCourse();
  }, [id]);

  const submitFeedback = async () => {
    try {
      await api.post("/feedbacks", {
        course: id,
        rating,
        message,
      });

      alert("Feedback submitted!");
      setRating(5);
      setMessage("");
    } catch (err) {
      console.log(err);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-box">

        <h1>
          ⭐ Feedback for{" "}
          <span style={{ color: "#ffb347" }}>
            {course ? course.title : "Loading..."}
          </span>
        </h1>

        {course && (
          <p className="course-desc">{course.description}</p>
        )}

        <label>Rating (1–5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label>Message</label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={submitFeedback}>Submit Feedback</button>
      </div>
    </div>
  );
}
