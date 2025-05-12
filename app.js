import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
// import morgan from 'morgan';
// import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import connectToDB from './config/dbConfig.js';
// import userRoutes from './routes/user.route.js';
// import bookRoutes from './routes/book.route.js';
// import dynamicImageRoutes from './routes/dynamic-image.route.js';
// import authRoutes from './routes/auth.route.js';
// import productsRoutes from './routes/products.route.js';
// import carstRoutes from './routes/carts.route.js';
// import recipesRoutes from './routes/recipes.route.js';
// import usersRoutes from './routes/users.route.js';
// import postsRoutes from './routes/posts.route.js';
// import commentsRoutes from './routes/comments.route.js';
// import todosRoutes from './routes/todos.route.js';
// import quotesRoutes from './routes/quotes.route.js';
// import httpRoutes from './routes/http.route.js';

connectToDB();


// Create Express application instance
const app = express();

// Move static file serving after other middleware configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
// app.use(morgan('tiny'));

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




/**
 * Root route handler
 */
// Configure routes

// app.use('/api/users', userRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/image', dynamicImageRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productsRoutes);
// app.use('/api/carts', carstRoutes);
// app.use('/api/recipes', recipesRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/posts', postsRoutes);
// app.use('/api/posts', postsRoutes);
// app.use('/api/comments', commentsRoutes);
// app.use('/api/todos', todosRoutes);
// app.use('/api/quotes', quotesRoutes);
// app.use('/api/http', httpRoutes);



app.get('/', (req, res) => {
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