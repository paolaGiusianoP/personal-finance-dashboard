import React from 'react';
import type { Transaction } from '../../types';

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onEdit,
  onDelete,
  formatCurrency,
  formatDate,
}) => {
  return (
    <tr className="hover:bg-slate-800/40 transition">
      <td className="px-6 py-5 text-sm text-slate-300">
        {formatDate(transaction.date)}
      </td>

      <td className="px-6 py-5">
        <div>
          <p className="font-medium text-white">
            {transaction.description || '-'}
          </p>
          <p className="text-sm text-slate-500">
            {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
          </p>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
            {transaction.category.icon}
          </div>
          <span className="text-slate-300">{transaction.category.name}</span>
        </div>
      </td>

      <td
        className={`px-6 py-5 text-right font-bold ${
          transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onEdit(transaction)}
            className="rounded-xl bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="rounded-xl bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;