// backend/src/server.ts
import express from 'express';
  // Import cors
  // Ensure correct import of config
import authRoutes from './routes/authRoutes';
import createRoute from './routes/createRoutes';
import updateRoute from './routes/updateRoute';
import { PORT } from './config';
import cors from 'cors'; // Correct import of cors
const app = express();

// Enable CORS with default settings (allows requests from any origin)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define your routes
app.use('/auth', authRoutes);
app.use('/update', updateRoute);
app.use('/create' , createRoute)

// Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
