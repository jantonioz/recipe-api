const router = require('express').Router()
const RecipeController = require('../controllers/recipe.controller')

router.get('/recipes', RecipeController.get)
router.get('/recipes/:id', RecipeController.getOne)
router.post('/recipes', RecipeController.create)
router.put('/recipes/:id', RecipeController.update)
router.delete('/recipes/:id', RecipeController.delete)

router.post('/recipes/:id/rate', RecipeController.rate)

module.exports = router