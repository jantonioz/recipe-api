const RestaurantService = require('../services/restaurant.service')

class RestaurantController {
  async register(req, res, next) {
    try {
      const created = await RestaurantService.register(req.body)
      delete created.password
      res.status(201).json(created)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await RestaurantService.getAll()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const restaurant = await RestaurantService.getOne({
        ...req.body,
        ...req.query,
        ...req.params
      })
      res.status(200).json(restaurant)
    } catch (error) {
      next(error)
    }
  }

  async getMenu(req, res, next) {
    try {
      const menu = await RestaurantService.getMenu({
        ...req.body,
        ...req.query,
        ...req.params
      })
      res.status(200).json(menu)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new RestaurantController()
