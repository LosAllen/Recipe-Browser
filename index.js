import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';

import connectDB from './config/database.js';
import setupSwagger from './config/swagger.js';
import passport from './middlewares/auth.js';

import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';
import categoryRoutes from './routes/categories.js';
import commentRoutes from './routes/comments.js';

// Load Environment Variables
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

// Initialize App
const app = express();

// Middleware
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'default_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);

// Swagger Documentation
setupSwagger(app);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));