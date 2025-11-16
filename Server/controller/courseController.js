const Course = require("../models/Course");

exports.list = async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ courses });
};
