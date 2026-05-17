const { getFinancialInsights } = require('../services/insightsService');
const prisma = require('../utils/prisma');

const getInsights = async (req, res) => {
  try {
    const insights = await getFinancialInsights(req.user.id, prisma);
    res.json({ success: true, data: insights });
  } catch (error) {
    console.error('Error getting insights:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getInsights };