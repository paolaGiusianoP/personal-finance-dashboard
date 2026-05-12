const prisma = require('../utils/prisma')

class TransactionRepository {
  async create(data) {
    return prisma.transaction.create({ data })
  }

  async findAllByUserId(userId, filters = {}) {
    const where = { userId }
    
    // Filtros opcionales
    if (filters.type) where.type = filters.type
    if (filters.categoryId) where.categoryId = filters.categoryId
    if (filters.startDate) where.date = { ...where.date, gte: filters.startDate }
    if (filters.endDate) where.date = { ...where.date, lte: filters.endDate }
    
    return prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy: { date: 'desc' }
    })
  }

  async findById(id, userId) {
    return prisma.transaction.findFirst({
      where: { id, userId },
      include: { category: true }
    })
  }

  async update(id, userId, data) {
    return prisma.transaction.updateMany({
      where: { id, userId },
      data
    })
  }

  async delete(id, userId) {
    return prisma.transaction.deleteMany({
      where: { id, userId }
    })
  }

  async getSummary(userId, startDate, endDate) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    })

    const summary = {
      income: 0,
      expense: 0,
      balance: 0
    }

    transactions.forEach(t => {
      if (t.type === 'income') {
        summary.income += t.amount
      } else {
        summary.expense += t.amount
      }
    })

    summary.balance = summary.income - summary.expense
    return summary
  }

  async getByCategory(userId, startDate, endDate) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      include: { category: true }
    })

    const categoryMap = new Map()

    transactions.forEach(t => {
      const categoryName = t.category.name
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, {
          category: categoryName,
          icon: t.category.icon,
          total: 0,
          type: t.type
        })
      }
      categoryMap.get(categoryName).total += t.amount
    })

    return Array.from(categoryMap.values())
  }
}

module.exports = new TransactionRepository()