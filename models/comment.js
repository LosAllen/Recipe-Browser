import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    dateCreated: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;