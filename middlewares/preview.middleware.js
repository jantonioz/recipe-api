const { v4: uuid4 } = require('uuid')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const newFileName = uuid4()
    // add extension
    const parts = file.originalname.split('.')
    const extension = parts.reverse()[0]
    cb(null, `${newFileName}.${extension}`)
  }
})
const upload = multer({ storage })

module.exports = {
  create: upload.array('previews', 3)
}
