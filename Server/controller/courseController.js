const Course = require("../models/Course");

exports.list = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    // ✅ Return PURE ARRAY (required by frontend)
    return res.json(courses);

  } catch (err) {
    console.error("Error loading courses:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
