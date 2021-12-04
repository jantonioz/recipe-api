const User = require('../models/user.model')
const crypto = require('./crypto')
const menuitemService = require('./menuitem.service')

class RestaurantService {
  async getAll() {
    const restaurants = await User.find({ isRestaurant: true }).lean().exec()
    return restaurants
  }

  async getOne({ name, id }) {
    const restaurant = await User.findOne({
      isRestaurant: true,
      $or: [
        { _id: id },
        { 'restaurantInfo.name': { $regex: '.*' + name + '.*' } }
      ]
    }).lean()

    const menusByRestaurant = await menuitemService.getByAuthor(restaurant._id)

    return { ...restaurant, menuItems: menusByRestaurant }
  }

  async register(restaurant) {
    const restaurantResult = await User.create(restaurant)
    const password = await crypto.encrypt(restaurantResult.password)
    restaurantResult.password = password
    restaurantResult.save()
    return { ...restaurantResult, password: undefined }
  }

  async getMenu({ name, id }) {
    const restaurantMenu = await menuitemService.getByAuthor({name, id})
    return restaurantMenu
  }
}

module.exports = new RestaurantService()
