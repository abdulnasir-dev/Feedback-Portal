const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// =================== FIXED CORS ===================
app.use(cors({
  origin: [
    "https://feedback-portal-alpha.vercel.app",   // Frontend (Vercel)
    "http://localhost:5173"                       // Local development
  ],
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const feedbackRoutes = require('./routes/feedback');

// Attach routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler
const { errorHandler } = require('./middleware/erroHandler');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
