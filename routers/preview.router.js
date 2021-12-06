const router = require('express').Router()
const PreviewMiddleware = require('../middlewares/preview.middleware')

router.post('/previews', PreviewMiddleware.create, (req, res, next) => {
  const fileNames = req.files.map(e => e.filename)
  res.status(200).json(fileNames)
})


module.exports = router