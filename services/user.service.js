const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const CryptoService = require('./crypto')
const config = require('../config/index').jwt

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
      token: jwt.sign(
        {
          username: user.username,
          name: user.fullName.split(' ')[0],
          id: user.id || user._id
        },
        config.secret
      )
    }
  }

  getUser(username) {
    return User.findOne({
      $or: [{ username }, { email: username }]
    }).select('username fullName password email birthday').lean()
  }

  update({ username, password, email, fullName, birthday }) {}
}

module.exports = new UserService()
