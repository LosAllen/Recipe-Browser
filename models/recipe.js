import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: { type: [Number], default: [] },
    dateCreated: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe; 