const router = require('express').Router()
const UserRouter = require('./user.router')
const RecipeRouter = require('./recipe.router')

router.use(UserRouter)
router.use(RecipeRouter)

router.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(401).json('Invalid Token')
	}
	return res.status(err.code || 400).json({ code: err.code, message: err.message })
})

module.exports = router
