const Recipe = require('../models/recipe.model')
const RecipeRating = require('../models/recipe_rating.model')

class RecipeService {
  async get(filters) {
    const recipes = await Recipe.find({ ...filters, visible: true })
      .populate('author')
      .populate({ path: 'rates', select: 'rate' })
      .lean()

    return recipes.map(this.calcRateAvg)
  }

  calcRateAvg(recipe) {
    if (!recipe.rates || !recipe.rates.length) recipe.rates = []
    const avg =
      recipe.rates.reduce((total, el) => total + el.rate, 0) /
      recipe.rates.length
    return { ...recipe, rateAvg: avg || 0 }
  }

  async getOne({ id }) {
    const recipe = await Recipe.findOne({ _id: id, visible: true })
      .populate('author')
      .populate('rates')
      .populate({
        path: 'rates',
        populate: {
          path: 'author',
          select: 'fullName'
        }
      })
      .lean()
    return this.calcRateAvg(recipe)
  }

  async create({ title, body, tags, level, ingredients, previews }, auth) {
    const { id } = auth
    // check if token belongs to a user with isRestaurant as true
    
    const recipe = await Recipe.create({
      title,
      body,
      tags,
      level,
      ingredients,
      author: id,
      rates: [],
      previews
    })
    recipe.populate('author').execPopulate()
    return recipe
  }

  async update({ id, title, body, tags, level, ingredients, previews }, auth) {
    const result = await Recipe.updateOne(
      { _id: id, author: auth.id },
      { title, body, tags, level, ingredients, previews }
    )
    const recipe = await Recipe.findOne({ _id: id }).populate('author').lean()
    return { ...recipe, ...result }
  }

  async delete(id, auth) {
    const result = await Recipe.updateOne(
      { _id: id, author: auth.id },
      { visible: false }
    )
    const recipe = await Recipe.findOne({ _id: id }).populate('author').lean()
    return { ...recipe, ...result }
  }
}

module.exports = new RecipeService()
