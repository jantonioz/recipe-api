const MenuitemRating = require('../models/menuitem_rating.model')
const Menuitem = require('../models/menuitem.model')
const RacipeService = require('./menuitem.service')
const menuitemService = require('./menuitem.service')

class RateService {
  async rate({ id, rate, comment }, auth) {
    const menuitem = await Menuitem.findOne({ _id: id }).populate('rates').lean()
    if (!menuitem) throw { code: 400, message: 'menuitem not exists' }

    let prevRate = await this.getRate(menuitem, auth.id)
    if (prevRate) {
      await this.update(prevRate, { rate, comment }, auth)
    } else {
      await this.create({ id, rate, comment }, auth)
    }

    return menuitemService.getOne({ id })
  }

  async getRate(menuitem, author) {
    const found = menuitem.rates.find(r => r.author.equals(author))
    if (!found) return false
    const rate = await MenuitemRating.findOne(found).exec()
    return rate
  }

  async create({ id, rate, comment }, auth) {
    const menuitemRate = await MenuitemRating.create({
      menuitem: id,
      author: auth.id,
      rate,
      comment
    })
    await menuitem.updateOne(
      { _id: id },
      { $addToSet: { rates: menuitemRate._id } }
    )
  }

  async update(prevRate, { rate, comment }, auth) {
    console.log(prevRate._id)
    const result = await MenuitemRating.updateOne(
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
