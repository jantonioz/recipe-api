const mongoose = require('mongoose')

const MenuitemRatingSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: true,
      index: true
    },
    menuitem: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: true,
      index: true
    },
    rate: { type: Number, required: true },
    comment: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('MenuitemRatings', MenuitemRatingSchema)
