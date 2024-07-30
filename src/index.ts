import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import jwtAuthMiddleware from './middleware/jwtAuth.middleware';
import keywordRoutes from './routes/keywordRoute';
import postRoutes from './routes/postRoute';
import authRoutes from './routes/authenticationRoute';
import logRoutes from './routes/loggingRoute';
import { secrets } from './utils/secrets';
import { startPostGeneration } from './utils/generateMockPostsScript';

// Initialize the Express app
const app = express();

// Create a writable stream to log HTTP requests
const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Use morgan middleware to log HTTP requests
app.use(morgan('combined', { stream: logStream }));

// Use the authentication routes
app.use('/api', authRoutes);

// Use JWT authentication middleware and the keyword routes
app.use('/api', jwtAuthMiddleware, keywordRoutes);

// Use JWT authentication middleware and the post routes
app.use('/api', jwtAuthMiddleware, postRoutes);

// Use JWT authentication middleware and the log routes
app.use('/api', jwtAuthMiddleware, logRoutes);

// Start generating posts
startPostGeneration();

// Start the server and log when the server is running
app.listen(secrets.PORT, () => {
  console.log(`Server running on port ${secrets.PORT}`);
});



