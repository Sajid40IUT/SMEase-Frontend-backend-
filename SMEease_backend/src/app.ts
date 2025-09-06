import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration for production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
