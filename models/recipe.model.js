const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, index: true, required: true },
    tags: { type: [String], index: true },
    ingredients: { type: [String] },
    body: { type: String, required: true },
    level: { type: Number, default: 1 },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: true,
      index: true
    },
    visible: { type: Boolean, default: true, select: false },
    rates: [{ type: mongoose.Types.ObjectId, ref: 'RecipeRatings' }],
    previews: [{ type: String }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipes', RecipeSchema)
