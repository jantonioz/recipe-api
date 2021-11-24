const router = require('express').Router()
const menuitemController = require('../controllers/menuitem.controller')

router.get('/menuitems', menuitemController.get)
router.get('/menuitems/:id', menuitemController.getOne)
router.post('/menuitems', menuitemController.create)
router.put('/menuitems/:id', menuitemController.update)
router.delete('/menuitems/:id', menuitemController.delete)

router.post('/menuitems/:id/rate', menuitemController.rate)

module.exports = router