import express from 'express';
import Recipe from '../models/recipe.js';

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new recipe
router.post('/', async (req, res) => {
  console.log("Incoming Recipe Data:", req.body);
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    console.log("Recipe Saved to MongoDB:", savedRecipe);
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error("Error Saving Recipe:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// PUT to update a recipe
router.put('/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a recipe
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search Recipes
router.get('/search', async (req, res) => {
  try {
    const { keyword, category, ingredients, minRating } = req.query;

    // Build search filter
    const filter = {};
    if (keyword) filter.title = { $regex: keyword, $options: 'i' };
    if (category) filter.category = category;
    if (ingredients) filter.ingredients = { $in: ingredients.split(',') };
    if (minRating) filter.rating = { $gte: Number(minRating) };

    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;