const getFinancialInsights = async (userId, prisma) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  
  // Obtener transacciones del mes actual
  const startDate = new Date(currentYear, currentMonth - 1, 1);
  const endDate = new Date(currentYear, currentMonth, 0);
  
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    include: { category: true }
  });
  
  const insights = [];
  
  // Mayor gasto del mes
  const expenses = transactions.filter(t => t.type === 'expense');
  if (expenses.length > 0) {
    const highestExpense = expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0]);
    insights.push({
      type: 'warning',
      icon: '⚠️',
      title: 'Mayor gasto del mes',
      description: `${highestExpense.category.name}: $${highestExpense.amount.toFixed(2)}`,
      suggestion: 'Revisa si este gasto fue necesario'
    });
  }
  
  // Categoría con más gastos
  const categoryTotals = {};
  expenses.forEach(t => {
    const catName = t.category.name;
    categoryTotals[catName] = (categoryTotals[catName] || 0) + t.amount;
  });
  
  if (Object.keys(categoryTotals).length > 0) {
    const topCategory = Object.entries(categoryTotals).sort((a,b) => b[1] - a[1])[0];
    insights.push({
      type: 'info',
      icon: '📊',
      title: 'Categoría principal',
      description: `${topCategory[0]}: $${topCategory[1].toFixed(2)}`,
      suggestion: `Considera reducir gastos en ${topCategory[0]}`
    });
  }
  
  // Comparación con mes anterior
  const prevStartDate = new Date(currentYear, currentMonth - 2, 1);
  const prevEndDate = new Date(currentYear, currentMonth - 1, 0);
  
  const prevTransactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: prevStartDate,
        lte: prevEndDate
      }
    }
  });
  
  const currentTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
  const prevTotal = prevTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  if (prevTotal > 0) {
    const percentChange = ((currentTotal - prevTotal) / prevTotal) * 100;
    if (Math.abs(percentChange) > 5) {
      insights.push({
        type: percentChange > 0 ? 'warning' : 'success',
        icon: percentChange > 0 ? '📈' : '📉',
        title: 'Comparación mensual',
        description: `${percentChange > 0 ? 'Aumentaste' : 'Disminuiste'} tus gastos en ${Math.abs(percentChange).toFixed(1)}%`,
        suggestion: percentChange > 0 ? 'Analiza tus gastos adicionales' : '¡Buen trabajo! Sigue así'
      });
    }
  }
  
  // Promedio diario de gastos
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const dailyAverage = currentTotal / daysInMonth;
  insights.push({
    type: 'info',
    icon: '📅',
    title: 'Promedio diario',
    description: `$${dailyAverage.toFixed(2)} por día`,
    suggestion: dailyAverage > 1000 ? 'Intenta reducir gastos diarios' : 'Estás dentro del promedio'
  });
  
  return insights;
};

module.exports = { getFinancialInsights };