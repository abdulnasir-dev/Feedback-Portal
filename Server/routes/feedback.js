const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/auth");
const feedbackController = require("../controller/feedbackController"); // ✅ correct path

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("course").isMongoId(),
    body("rating").isInt({ min: 1, max: 5 }),
    body("message").optional().isString()
  ],
  feedbackController.create
);

router.get("/mine", protect, feedbackController.getMyFeedbacks);
router.get("/course/:courseId", protect, feedbackController.getFeedbacksByCourse);

module.exports = router;
