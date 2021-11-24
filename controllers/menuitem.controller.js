const menuitemService = require('../services/menuitem.service')
const RateService = require('../services/rate.serivce')

class menuitemController {
  async get(req, res, next) {
    try {
      const result = await menuitemService.get(req.query)
      res.status(200).json({ menuitems: result })
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const result = await menuitemService.getOne(req.params)
      res.status(200).json({ menuitem: result })
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const menuitem = await menuitemService.create(req.body, req.auth)
      res.status(201).json({ menuitem })
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
      const menuitem = await menuitemService.update(
        { id: req.params.id, ...req.body },
        req.auth
      )
      res.status(202).json({ menuitem })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const menuitem = await menuitemService.delete(req.params.id, req.auth)
      res.status(202).json({ menuitem })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new menuitemController()
