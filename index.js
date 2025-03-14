const express = require('express');
const connectDB = require('./config/database');
const setupSwagger = require('./config/swagger');
const passport = require('./middlewares/auth');
const session = require('express-session');
require('dotenv').config();

// Import Routes
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/categories');
const commentRoutes = require('./routes/comments');

const app = express();

// Middleware
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
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
