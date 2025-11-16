import "../Style/Response.css";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Response() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const res = await api.get("/feedbacks/mine");
        setFeedbacks(res.data.feedbacks);
      } catch (err) {
        console.log("Error loading feedbacks", err);
      }
    };

    loadFeedbacks();
  }, []);

  return (
    <div className="response-page">
      <div className="response-box">
        <h2>📩 My Feedbacks</h2>

        {feedbacks.length === 0 ? (
          <p className="no-response">No feedback submitted yet.</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb._id} className="response-item">
              <h4>⭐ Rating: {fb.rating}/5</h4>
              <p>
                Course: <b>{fb.course?.title || "Unknown Course"}</b>
              </p>
              <p>
                Message: <i>{fb.message || "No message"}</i>
              </p>
              <p className="date">
                Submitted on:{" "}
                {new Date(fb.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
