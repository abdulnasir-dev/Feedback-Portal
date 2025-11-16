require("dotenv").config();
const connectDB = require("../config/db");
const Course = require("../models/Course");

const courses = [
  {
    title: "Mathematics 101",
    description: "An introductory course to Mathematics.",
    image: "https://i.ibb.co/Gv3PJWkM/maths.webp",
    type: "course",
  },
  {
    title: "Physics 201",
    description: "Fundamentals of Physics.",
    image: "https://i.ibb.co/HptPpPfD/physics.jpg",
    type: "course",
  },
  {
    title: "Chemistry 301",
    description: "Basics of Chemistry.",
    image: "https://i.ibb.co/Hfn81N2S/coursechemistry.jpg",
    type: "course",
  },
  {
    title: "Science Fair 2025",
    description: "Annual school science exhibition.",
    image: "https://i.ibb.co/4gKNvHKt/scein.png",
    type: "event",
  },
  {
    title: "Math Olympiad 2025",
    description: "Competitive mathematics event.",
    image: "https://i.ibb.co/jZRBspr8/mathoped.jpg",
    type: "event",
  },
  {
    title: "Coding Bootcamp",
    description: "Intensive programming workshop.",
    image: "https://i.ibb.co/4g3CjjDV/bootcamp.png",
    type: "event",
  },
];

const seed = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    await Course.deleteMany({});
    console.log("Old courses deleted");

    await Course.insertMany(courses);
    console.log("Courses inserted successfully");

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();
