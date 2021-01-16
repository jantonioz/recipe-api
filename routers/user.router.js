const router = require('express').Router()
const UserController = require('../controllers/user.controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.put('/account/info', UserController.updateUserInfo)

module.exports = router
