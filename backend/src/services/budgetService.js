const budgetRepository = require('../repositories/budgetRepository');

class BudgetService {
  async createOrUpdateBudget(userId, data) {
    const { categoryId, amount, month, year } = data;

    if (amount < 0) {
      throw new Error('El presupuesto no puede ser negativo');
    }

    const existing = await budgetRepository.findByCategory(userId, categoryId, month, year);

    if (existing) {
      await budgetRepository.update(existing.id, userId, { amount });
      return this.getBudgetWithSpending(userId, categoryId, month, year);
    }

    const budget = await budgetRepository.create({
      amount,
      month,
      year,
      categoryId,
      userId
    });

    return this.getBudgetWithSpending(userId, categoryId, month, year);
  }

  async getBudgetWithSpending(userId, categoryId, month, year) {
    const budget = await budgetRepository.findByCategory(userId, categoryId, month, year);
    const spent = await budgetRepository.getSpendingByCategory(userId, categoryId, month, year);

    return {
      ...budget,
      spent,
      remaining: budget ? budget.amount - spent : 0,
      percentage: budget ? (spent / budget.amount) * 100 : 0
    };
  }

  async getAllBudgets(userId, month, year) {
    const budgets = await budgetRepository.findAllByUser(userId, month, year);
    
    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {
        const spent = await budgetRepository.getSpendingByCategory(userId, budget.categoryId, month, year);
        return {
          ...budget,
          spent,
          remaining: budget.amount - spent,
          percentage: (spent / budget.amount) * 100
        };
      })
    );

    return budgetsWithSpending;
  }

  async deleteBudget(userId, budgetId) {
    return budgetRepository.delete(budgetId, userId);
  }

  async checkAlert(userId, month, year) {
    const budgets = await this.getAllBudgets(userId, month, year);
    
    const alerts = budgets
      .filter(b => b.percentage >= 80)
      .map(b => ({
        category: b.category.name,
        spent: b.spent,
        budget: b.amount,
        percentage: b.percentage,
        remaining: b.remaining,
        level: b.percentage >= 100 ? 'danger' : b.percentage >= 90 ? 'warning' : 'info'
      }));

    return alerts;
  }
}

module.exports = new BudgetService();