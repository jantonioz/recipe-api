const MenuitemService = require('../services/menuitem.service')
const RateService = require('../services/rate.serivce')

class MenuitemController {
  async get(req, res, next) {
    try {
      const result = await MenuitemService.get(req.query)
      res.status(200).json({ menuitems: result })
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const result = await MenuitemService.getOne(req.params)
      res.status(200).json({ menuitem: result })
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const menuitem = await MenuitemService.create(req.body, req.auth)
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
      const menuitem = await MenuitemService.update(
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
      const menuitem = await MenuitemService.delete(req.params.id, req.auth)
      res.status(202).json({ menuitem })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new MenuitemController()
