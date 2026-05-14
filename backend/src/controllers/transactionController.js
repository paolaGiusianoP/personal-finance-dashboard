const transactionService = require('../services/transactionService')
const prisma = require('../utils/prisma') 

// Obtener todas las transacciones del usuario
const getTransactions = async (req, res) => {
  try {
    const { type, categoryId, startDate, endDate } = req.query
    const filters = { type, categoryId, startDate, endDate }
    
    const transactions = await transactionService.getUserTransactions(req.user.id, filters)
    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Crear una nueva transacción
const createTransaction = async (req, res) => {
  try {
    const { amount, type, description, date, categoryId } = req.body
    const transaction = await transactionService.createTransaction(req.user.id, {
      amount,
      type,
      description,
      date,
      categoryId
    })
    res.status(201).json({
      success: true,
      message: 'Transacción creada exitosamente',
      data: transaction
    })
  } catch (error) {
    const status = error.message.includes('requeridos') || 
                   error.message.includes('monto') ||
                   error.message.includes('Tipo inválido') ? 400 : 
                   error.message.includes('no encontrada') ? 404 : 500
    res.status(status).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Actualizar una transacción
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const { amount, type, description, date, categoryId } = req.body
    const transaction = await transactionService.updateTransaction(req.user.id, id, {
      amount,
      type,
      description,
      date,
      categoryId
    })
    res.json({
      success: true,
      message: 'Transacción actualizada exitosamente',
      data: transaction
    })
  } catch (error) {
    const status = error.message.includes('no encontrada') ? 404 : 400
    res.status(status).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Eliminar una transacción
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params
    await transactionService.deleteTransaction(req.user.id, id)
    res.json({
      success: true,
      message: 'Transacción eliminada exitosamente'
    })
  } catch (error) {
    const status = error.message.includes('no encontrada') ? 404 : 500
    res.status(status).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Obtener resumen financiero
const getSummary = async (req, res) => {
  try {
    const { period = 'month' } = req.query
    const summary = await transactionService.getSummary(req.user.id, period)
    res.json({
      success: true,
      data: summary
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Obtener estadísticas por categoría
const getCategoryStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query
    const stats = await transactionService.getCategoryStats(req.user.id, period)
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Obtener evolución mensual
const getMonthlyEvolution = async (req, res) => {
  try {
    const userId = req.user.id;
    const { months = 6 } = req.query; 

    const result = await prisma.$queryRaw`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', date), 'Mon') as month,
        EXTRACT(MONTH FROM date) as month_num,
        EXTRACT(YEAR FROM date) as year,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
      FROM "Transaction"
      WHERE "userId" = ${userId}
        AND date >= NOW() - INTERVAL '${months} months'
      GROUP BY DATE_TRUNC('month', date), EXTRACT(MONTH FROM date), EXTRACT(YEAR FROM date)
      ORDER BY year ASC, month_num ASC
    `;

    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener evolución mensual' });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getCategoryStats,
  getMonthlyEvolution 
}