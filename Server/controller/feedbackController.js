const { validationResult } = require("express-validator");
const Feedback = require("../models/Feedback");
const Course = require("../models/Course");

// Create feedback
exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { course: courseId, rating, message } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const fb = await Feedback.create({
      user: req.user._id,
      course: courseId,
      rating,
      message
    });

    res.status(201).json({ feedback: fb });
  } catch (err) {
    next(err);
  }
};

// Get my feedbacks
// Get my feedbacks
exports.getMyFeedbacks = async (req, res, next) => {
  try {
    const my = await Feedback.find({ user: req.user._id })
      .populate("course", "title type")   // 🔥 IMPORTANT
      .sort({ createdAt: -1 });

    res.json({ feedbacks: my });
  } catch (err) {
    next(err);
  }
};


// Get all feedbacks for a course
exports.getFeedbacksByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const fbs = await Feedback.find({ course: courseId }).populate("user", "name email").sort({ createdAt: -1 });
    res.json({ feedbacks: fbs });
  } catch (err) {
    next(err);
  }
};
