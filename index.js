import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import setupSwagger from './config/swagger.js';
import passport from "./middlewares/auth.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';
import categoryRoutes from './routes/categories.js';
import commentRoutes from './routes/comments.js';

// Load Environment Variables
dotenv.config();

// Initialize App
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: [
        'http://localhost:3000',              // Allowing local Deploy
        'https://recipe-browser-yk8s.onrender.com', // Alllow Render Deploy
        'https://recipe-browser-8fj5.onrender.com' // Allow Render Deploy
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


// Session Configuration
// Use MongoDB for session storage
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    })
}));

// Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection failed:", err));


// Middleware for parsing request bodies
app.use(express.static('public')); // Serve static files from the public directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Initialize Passport before using routes
passport.initializePassport(app);

// Routes
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);

// Swagger Documentation
setupSwagger(app);

// Basic Route for Homepage
app.get('/', (req, res) => {
    res.send('Recipe Browser API is running successfully.');
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));