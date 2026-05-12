const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware)

// Rutas de transacciones
router.get('/', transactionController.getTransactions)
router.post('/', transactionController.createTransaction)
router.put('/:id', transactionController.updateTransaction)
router.delete('/:id', transactionController.deleteTransaction)

// Rutas de estadísticas
router.get('/summary', transactionController.getSummary)
router.get('/stats/categories', transactionController.getCategoryStats)

module.exports = router