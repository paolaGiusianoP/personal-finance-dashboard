const budgetService = require('../services/budgetService');

const getBudgets = async (req, res) => {
  try {
    const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;
    const budgets = await budgetService.getAllBudgets(req.user.id, parseInt(month), parseInt(year));
    res.json({ success: true, data: budgets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createOrUpdateBudget = async (req, res) => {
  try {
    const { categoryId, amount, month, year } = req.body;
    const budget = await budgetService.createOrUpdateBudget(req.user.id, {
      categoryId,
      amount,
      month,
      year
    });
    res.json({ success: true, data: budget });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    await budgetService.deleteBudget(req.user.id, id);
    res.json({ success: true, message: 'Presupuesto eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAlerts = async (req, res) => {
  try {
    const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;
    const alerts = await budgetService.checkAlert(req.user.id, parseInt(month), parseInt(year));
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getBudgets, createOrUpdateBudget, deleteBudget, getAlerts };