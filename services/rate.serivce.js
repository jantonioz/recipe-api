const RecipeRating = require('../models/recipe_rating.model')
const Recipe = require('../models/recipe.model')
const RacipeService = require('./recipe.service')
const recipeService = require('./recipe.service')

class RateService {
  async rate({ id, rate, comment }, auth) {
    const recipe = await Recipe.findOne({ _id: id }).populate('rates').lean()
    if (!recipe) throw { code: 400, message: 'Recipe not exists' }

    let prevRate = await this.getRate(recipe, auth.id)
    if (prevRate) {
      await this.update(prevRate, { rate, comment }, auth)
    } else {
      await this.create({ id, rate, comment }, auth)
    }

    return recipeService.getOne({ id })
  }

  async getRate(recipe, author) {
    const found = recipe.rates.find(r => r.author.equals(author))
    if (!found) return false
    const rate = await RecipeRating.findOne(found).exec()
    return rate
  }

  async create({ id, rate, comment }, auth) {
    const recipeRate = await RecipeRating.create({
      recipe: id,
      author: auth.id,
      rate,
      comment
    })
    await Recipe.updateOne(
      { _id: id },
      { $addToSet: { rates: recipeRate._id } }
    )
  }

  async update(prevRate, { rate, comment }, auth) {
    console.log(prevRate._id)
    const result = await RecipeRating.updateOne(
      {
        _id: prevRate._id.toString(),
        author: auth.id
      },
      { rate, comment }
    )
    return result
  }
}

module.exports = new RateService()
