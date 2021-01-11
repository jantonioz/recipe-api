const RecipeService = require('../services/recipe.service')
const RateService = require('../services/rate.serivce')

class RecipeController {
  async get(req, res, next) {
    try {
      const result = await RecipeService.get(req.query)
      res.status(200).json({ recipes: result })
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const result = await RecipeService.getOne(req.params)
      res.status(200).json({ recipe: result })
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const recipe = await RecipeService.create(req.body, req.auth)
      res.status(201).json({ recipe })
    } catch (error) {
      next(error)
    }
  }

  async rate(req, res, next) {
    try {
      const rate = await RateService.rate(
        { ...req.body, id: req.params.id },
        req.auth
      )
      res.status(201).json({ rate })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const recipe = await RecipeService.update(
        { id: req.params.id, ...req.body },
        req.auth
      )
      res.status(202).json({ recipe })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const recipe = await RecipeService.delete(req.params.id, req.auth)
      res.status(202).json({ recipe })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new RecipeController()
