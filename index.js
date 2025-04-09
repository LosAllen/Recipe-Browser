import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import setupSwagger from './config/swagger.js';
import passport, { initializePassport } from './middlewares/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';
import categoryRoutes from './routes/categories.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';

// Load Environment Variables
dotenv.config();

// Initialize App
const app = express();
app.set('trust proxy', 1);

// Parse Cookies Early
app.use(cookieParser());

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://recipe-browser-8fj5.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    sameSite: 'none',
    secure: true
  }
}));

// Initialize Passport
initializePassport(app);

// Body Parsers and Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection failed:", err));

// Routes
app.use('/', authRoutes); // Place auth routes early so GitHub flow works before checks
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);

// Swagger Docs
setupSwagger(app);

// Root API Test
app.get('/', (req, res) => {
  res.send('Recipe Browser API is running successfully.');
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));