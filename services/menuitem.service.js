const MenuItem = require('../models/menuitem.model')
const MenuitemRating = require('../models/menuitem_rating.model')

class MenuitemService {
  async get(filters) {
    const menuitems = await MenuItem.find({ ...filters, visible: true })
      .populate('author')
      .populate({ path: 'rates', select: 'rate' })
      .lean()

    return menuitems.map(this.calcRateAvg)
  }

  async getByAuthor(authorId) {
    const menuItems = await MenuItem.find({ author: authorId })
      .populate({ path: 'rates', select: 'rates' })
      .lean()
      .exec()
    return menuItems
  }

  calcRateAvg(menuitem) {
    if (!menuitem.rates || !menuitem.rates.length) menuitem.rates = []
    const avg =
      menuitem.rates.reduce((total, el) => total + el.rate, 0) /
      menuitem.rates.length
    return { ...menuitem, rateAvg: avg || 0 }
  }

  async getOne({ id }) {
    const menuitem = await MenuItem.findOne({ _id: id, visible: true })
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
    return this.calcRateAvg(menuitem)
  }

  async create({ title, body, tags, level, ingredients, previews }, auth) {
    const { id } = auth
    // check if token belongs to a user with isRestaurant as true

    const menuitem = await MenuItem.create({
      title,
      body,
      tags,
      level,
      ingredients,
      author: id,
      rates: [],
      previews
    })
    menuitem.populate('author').execPopulate()
    return menuitem
  }

  async update({ id, title, body, tags, level, ingredients, previews }, auth) {
    const result = await MenuItem.updateOne(
      { _id: id, author: auth.id },
      { title, body, tags, level, ingredients, previews }
    )
    const menuitem = await MenuItem.findOne({ _id: id })
      .populate('author')
      .lean()
    return { ...menuitem, ...result }
  }

  async delete(id, auth) {
    const result = await MenuItem.updateOne(
      { _id: id, author: auth.id },
      { visible: false }
    )
    const menuitem = await MenuItem.findOne({ _id: id })
      .populate('author')
      .lean()
    return { ...menuitem, ...result }
  }
}

module.exports = new MenuitemService()
