import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;