import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';
import setupSwagger from './config/swagger.js';
import { initializePassport } from './middlewares/auth.js'; // Import the initializePassport function
import cors from 'cors';

import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';
import categoryRoutes from './routes/categories.js';
import commentRoutes from './routes/comments.js';

// Load Environment Variables
dotenv.config();

// Initialize App
const app = express();



// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Parse JSON bodies
app.use(express.json()); // Parse JSON bodies
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'default_secret', 
    resave: false, 
    saveUninitialized: true 
}));

//Initialize Passport before using routes
initializePassport(app);

// Fix Mongoose Warning
mongoose.set('strictQuery', false);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection failed:", err));

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

// Basic Route for Homepage
app.get('/', (req, res) => {
    res.send('Recipe Browser API is running successfully.');
});
