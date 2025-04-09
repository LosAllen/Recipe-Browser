import express from 'express';
import Comment from '../models/comment.js';
import { ensureAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET comments for a specific recipe
router.get('/recipe/:recipeId', async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.recipeId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new comment
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const { text, recipeId } = req.body;

    if (!text || !recipeId) {
      return res.status(400).json({ error: 'Missing comment text or recipe ID' });
    }

    const comment = new Comment({
      text,
      recipe: recipeId,
      author: req.user._id
    });

    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving comment:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// PUT to update a comment
router.put('/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) return res.status(404).json({ error: 'Comment not found' });
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;