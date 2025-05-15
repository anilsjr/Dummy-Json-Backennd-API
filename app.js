import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import morgan from 'morgan';
// import winston from 'winston';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';

import connectToDB from './config/dbConfig.js';
await connectToDB();
 
// import dynamicImageRoutes from './routes/dynamicImage.route.js';
// import authRoutes from './routes/auth.route.js';
// import productsRoutes from './routes/products.route.js';
// import carstRoutes from './routes/carts.route.js';
import recipesRoutes from './routes/recipes.route.js';
// import usersRoutes from './routes/users.route.js';
// import postsRoutes from './routes/posts.route.js';
import commentsRoutes from './routes/comments.route.js';
import todosRoutes from './routes/todos.route.js';
import quotesRoutes from './routes/quotes.route.js';
// import httpRoutes from './routes/http.route.js';



// Create Express application instance
const app = express();

// Move static file serving after other middleware configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors());
// app.use(helmet());
// app.use(morgan('tiny'));

// Apply rate limiting middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use(limiter);


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


/**
 * Root route handler
 */
// Configure routes

const API_BASE_URL = process.env.API_BASE_URL  // /api/....

app.use( `/${API_BASE_URL}/recipes`, recipesRoutes);
// app.use( `/${API_BASE_URL}/image`, dynamicImageRoutes);
// app.use( `/${API_BASE_URL}/auth`, authRoutes);
// app.use( `/${API_BASE_URL}/products`, productsRoutes);
// app.use( `/${API_BASE_URL}/carts`, carstRoutes);
// app.use( `/${API_BASE_URL}/users`, usersRoutes);
// app.use( `/${API_BASE_URL}/posts`, postsRoutes);
app.use( `/${API_BASE_URL}/comments`, commentsRoutes);
app.use( `/${API_BASE_URL}/todos`, todosRoutes);
app.use( `/${API_BASE_URL}/quotes`, quotesRoutes);
// app.use( `/${API_BASE_URL}/http`, httpRoutes);



app.get('/', (req, res) => {
  console.log(`/${API_BASE_URL}/recipes`);
  res.status(200).json({message: 'Dummy JSON System API is running..........'});
});


//route not found error handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`);
});