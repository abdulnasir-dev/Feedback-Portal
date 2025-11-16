import "../Style/Card.css";

export default function Card({ course, onFeedback }) {
  const img =
    course.image && course.image.trim().length > 0
      ? course.image
      : "https://dummyimage.com/300x200/000/fff&text=No+Image";

  return (
    <div className="course-card" onClick={onFeedback}>
      <img
        src={img}
        alt={course.title}
        className="course-image"
      />
      <h3>{course.title}</h3>
     
    </div>
    
  );
}
