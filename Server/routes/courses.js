const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

// GET /api/courses
router.get('/', courseController.list);

module.exports = router;
