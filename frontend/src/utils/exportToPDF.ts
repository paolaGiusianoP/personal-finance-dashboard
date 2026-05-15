import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: { name: string };
  amount: number;
  type: 'income' | 'expense';
}

export const exportTransactionsToPDF = (transactions: Transaction[], period: string) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text('Reporte de Transacciones', 14, 20);
  
  // Subtítulo
  doc.setFontSize(12);
  doc.text(`Período: ${period}`, 14, 35);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 42);
  
  // Tabla
  const tableData = transactions.map(t => [
    new Date(t.date).toLocaleDateString('es-ES'),
    t.description || '-',
    t.category.name,
    t.type === 'income' ? '+' : '-',
    `$${t.amount.toFixed(2)}`
  ]);
  
  autoTable(doc, {
    head: [['Fecha', 'Descripción', 'Categoría', 'Tipo', 'Monto']],
    body: tableData,
    startY: 55,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
    alternateRowStyles: { fillColor: [30, 41, 59] },
  });
  
  doc.save(`transacciones_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportSummaryToPDF = (summary: { income: number; expense: number; balance: number }, period: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Resumen Financiero', 14, 20);
  doc.setFontSize(12);
  doc.text(`Período: ${period}`, 14, 35);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 42);
  
  autoTable(doc, {
    head: [['Concepto', 'Monto']],
    body: [
      ['Ingresos', `$${summary.income.toFixed(2)}`],
      ['Gastos', `$${summary.expense.toFixed(2)}`],
      ['Balance', `$${summary.balance.toFixed(2)}`],
    ],
    startY: 55,
    styles: { fontSize: 12 },
    headStyles: { fillColor: [59, 130, 246] },
  });
  
  doc.save(`resumen_${new Date().toISOString().split('T')[0]}.pdf`);
};