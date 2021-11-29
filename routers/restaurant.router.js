const router = require('express').Router()
const RestaurantController = require('../controllers/restaurant.controller')

router.get('/restaurants', RestaurantController.getAll)
router.get('/restaurants/:id', RestaurantController.getOne)

module.exports = router
