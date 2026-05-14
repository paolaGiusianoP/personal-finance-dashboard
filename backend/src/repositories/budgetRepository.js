const prisma = require('../utils/prisma');

class BudgetRepository {
  async create(data) {
    return prisma.budget.create({ data });
  }

  async findAllByUser(userId, month, year) {
    return prisma.budget.findMany({
      where: { userId, month, year },
      include: { category: true }
    });
  }

  async findByCategory(userId, categoryId, month, year) {
    return prisma.budget.findFirst({
      where: { userId, categoryId, month, year },
      include: { category: true }
    });
  }

  async update(id, userId, data) {
    return prisma.budget.updateMany({
      where: { id, userId },
      data
    });
  }

  async delete(id, userId) {
    return prisma.budget.deleteMany({
      where: { id, userId }
    });
  }

  async getSpendingByCategory(userId, categoryId, month, year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const result = await prisma.transaction.aggregate({
      where: {
        userId,
        categoryId,
        type: 'expense',
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: { amount: true }
    });

    return result._sum.amount || 0;
  }
}

module.exports = new BudgetRepository();