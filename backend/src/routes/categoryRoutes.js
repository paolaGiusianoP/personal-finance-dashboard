const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/', categoryController.getCategories)
router.post('/', categoryController.createCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)
router.post('/initialize', categoryController.initializeDefaultCategories)

module.exports = router