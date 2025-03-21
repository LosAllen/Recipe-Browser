import express from 'express';
import Recipe from '../models/recipe.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    console.log("Incoming Recipe Data:", req.body);  // Log request payload

    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        console.log("Recipe Saved to MongoDB:", savedRecipe); // Log successful DB save

        res.status(201).json(savedRecipe);
    } catch (err) {
        console.error("Error Saving Recipe:", err.message);  // Log error details
        res.status(400).json({ error: err.message });
    }
});

export default router; 