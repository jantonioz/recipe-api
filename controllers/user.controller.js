const router = require('express').Router()
const UserService = require('../services/user.service')

class UserController {
	async login(req, res, next) {
		try {
			const result = await UserService.login(req.body)
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	async register(req, res, next) {
		try {
			const result = await UserService.register(req.body)
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	async updateUserInfo(req, res, next) {
		try {
			const result = await UserService.update(req.auth, req.body)
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}	
}

module.exports = new UserController()
