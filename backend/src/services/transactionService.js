const transactionRepository = require('../repositories/transactionRepository')
const categoryRepository = require('../repositories/categoryRepository')

class TransactionService {
  async createTransaction(userId, data) {
    const { amount, type, description, date, categoryId } = data

    // Validaciones
    if (!amount || !type || !categoryId) {
      throw new Error('Monto, tipo y categoría son requeridos')
    }

    if (amount <= 0) {
      throw new Error('El monto debe ser mayor a 0')
    }

    if (!['income', 'expense'].includes(type)) {
      throw new Error('Tipo inválido. Debe ser "income" o "expense"')
    }

    // Verificar que la categoría existe y pertenece al usuario
    const category = await categoryRepository.findById(categoryId, userId)
    if (!category) {
      throw new Error('Categoría no encontrada')
    }

    // Si es gasto, verificar que la categoría sea de tipo expense
    if (type === 'expense' && category.type !== 'expense') {
      throw new Error('La categoría seleccionada es de ingreso, no de gasto')
    }

    // Si es ingreso, verificar que la categoría sea de tipo income
    if (type === 'income' && category.type !== 'income') {
      throw new Error('La categoría seleccionada es de gasto, no de ingreso')
    }

    const transaction = await transactionRepository.create({
      amount,
      type,
      description: description || null,
      date: date ? new Date(date) : new Date(),
      userId,
      categoryId
    })

    // Retornar la transacción con la categoría incluida
    return transactionRepository.findById(transaction.id, userId)
  }

  async getUserTransactions(userId, filters = {}) {
    const { type, categoryId, startDate, endDate } = filters
    
    const where = {}
    if (type) where.type = type
    if (categoryId) where.categoryId = categoryId
    if (startDate) where.startDate = new Date(startDate)
    if (endDate) where.endDate = new Date(endDate)
    
    const transactions = await transactionRepository.findAllByUserId(userId, where)
    return transactions
  }

  async updateTransaction(userId, transactionId, data) {
    const { amount, type, description, date, categoryId } = data

    // Verificar que la transacción existe y pertenece al usuario
    const existingTransaction = await transactionRepository.findById(transactionId, userId)
    if (!existingTransaction) {
      throw new Error('Transacción no encontrada')
    }

    // Si cambia la categoría, verificar que existe
    if (categoryId && categoryId !== existingTransaction.categoryId) {
      const category = await categoryRepository.findById(categoryId, userId)
      if (!category) {
        throw new Error('Categoría no encontrada')
      }
    }

    const updateData = {}
    if (amount) {
      if (amount <= 0) throw new Error('El monto debe ser mayor a 0')
      updateData.amount = amount
    }
    if (type) {
      if (!['income', 'expense'].includes(type)) {
        throw new Error('Tipo inválido')
      }
      updateData.type = type
    }
    if (description !== undefined) updateData.description = description
    if (date) updateData.date = new Date(date)
    if (categoryId) updateData.categoryId = categoryId

    await transactionRepository.update(transactionId, userId, updateData)
    return transactionRepository.findById(transactionId, userId)
  }

  async deleteTransaction(userId, transactionId) {
    const existingTransaction = await transactionRepository.findById(transactionId, userId)
    if (!existingTransaction) {
      throw new Error('Transacción no encontrada')
    }

    const result = await transactionRepository.delete(transactionId, userId)
    return result.count > 0
  }

  async getSummary(userId, period = 'month') {
    const now = new Date()
    let startDate = new Date()
    let endDate = new Date()

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setDate(now.getDate() - 30)
        break
      case 'year':
        startDate.setDate(now.getDate() - 365)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    const summary = await transactionRepository.getSummary(userId, startDate, endDate)
    return {
      period,
      startDate,
      endDate,
      ...summary
    }
  }

  async getCategoryStats(userId, period = 'month') {
    const now = new Date()
    let startDate = new Date()
    let endDate = new Date()

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setDate(now.getDate() - 30)
        break
      case 'year':
        startDate.setDate(now.getDate() - 365)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    const stats = await transactionRepository.getByCategory(userId, startDate, endDate)
    return {
      period,
      startDate,
      endDate,
      data: stats.filter(s => s.type === 'expense').sort((a, b) => b.total - a.total)
    }
  }
}

module.exports = new TransactionService()