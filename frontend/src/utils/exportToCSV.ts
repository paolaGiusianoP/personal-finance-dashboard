import { saveAs } from 'file-saver';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: { name: string; icon: string };
  amount: number;
  type: 'income' | 'expense';
}

export const exportTransactionsToCSV = (transactions: Transaction[], filename: string = 'transacciones') => {
  // Formatear datos para CSV
  const csvData = transactions.map((t) => ({
    Fecha: new Date(t.date).toLocaleDateString('es-ES'),
    Descripción: t.description || '-',
    Categoría: t.category.name,
    Tipo: t.type === 'income' ? 'Ingreso' : 'Gasto',
    Monto: t.amount.toFixed(2),
  }));

  // Convertir a CSV
  const headers = Object.keys(csvData[0] || {});
  const csvRows = [];

  csvRows.push(headers.join(','));

  for (const row of csvData) {
    const values = headers.map((header) => {
      const value = row[header as keyof typeof row];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportSummaryToCSV = (summary: { income: number; expense: number; balance: number }) => {
  const csvData = [
    { Concepto: 'Ingresos', Monto: summary.income.toFixed(2) },
    { Concepto: 'Gastos', Monto: summary.expense.toFixed(2) },
    { Concepto: 'Balance', Monto: summary.balance.toFixed(2) },
  ];

  const headers = ['Concepto', 'Monto'];
  const csvRows = [headers.join(',')];

  for (const row of csvData) {
    csvRows.push(`${row.Concepto},${row.Monto}`);
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `resumen_${new Date().toISOString().split('T')[0]}.csv`);
};