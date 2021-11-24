const router = require('express').Router()
const UserRouter = require('./user.router')
const menuitemRouter = require('./menuitem.router')
const PreviewRouter = require('./preview.router')

router.use(UserRouter)
router.use(menuitemRouter)
router.use(PreviewRouter)

router.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(401).json('Invalid Token')
	}
	return res.status(err.code || 400).json({ code: err.code, message: err.message })
})

module.exports = router
