const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const CryptoService = require('./crypto')
const config = require('../config/index').jwt
const moment = require('moment')

class UserService {
  async login({ username, password }) {
    const user = await this.getUser(username)
    if (!user) throw { code: 401, message: 'Invalid credentials' }

    const correctCredentials = await CryptoService.compare(
      user.password,
      password
    )
    if (!correctCredentials) throw { code: 401, message: 'Invalid credentials' }

    return this.getToken({ ...user, username })
  }

  async register({ username, password, email, fullName }) {
    const hash = await CryptoService.encrypt(password)
    await User.create({
      username,
      password: hash,
      email,
      fullName
    })
    const user = await this.getUser(username)
    return this.getToken({ ...user, username })
  }

  getToken(user) {
    return {
      token: jwt.sign(this.getTokenProps(user), config.secret)
    }
  }

  getTokenProps(user) {
    return {
      username: user.username,
      name: user.fullName.split(' ')[0],
      fullName: user.fullName,
      email: user.email,
      birthday: user.birthday,
      id: user.id || user._id
    }
  }

  async getUser(username, showPassword = false) {
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    })
      .select('username fullName password email birthday')
      .lean()

    return { ...user, birthday: moment.utc(user.birthday).format('YYYY-MM-DD') }
  }

  async getRestaurants() {
    const restaurants = await User.find({ isRestaurant: true })
      .select('username fullName')
      .lean()

    return restaurants;
  }

  async update(auth, { username, email, fullName, birthday }) {
    if (!username) username = auth.username

    const userExists = await User.findOne({ username: auth.username })
    if (!userExists) throw { code: 401, message: 'Invalid user' }

    await User.updateOne(
      { username: auth.username },
      { username, email, fullName, birthday: moment.utc(birthday).format() }
    )

    return this.getTokenProps(await this.getUser(username))
  }
}

module.exports = new UserService()
