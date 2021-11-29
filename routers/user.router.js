const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const RestaurantController = require('../controllers/restaurant.controller')

router.post('/register', UserController.register)
router.post('/register/restaurant', RestaurantController.register)
router.post('/login', UserController.login)
router.put('/account/info', UserController.updateUserInfo)

module.exports = router
