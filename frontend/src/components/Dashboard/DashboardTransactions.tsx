import React from 'react';
import { Link } from 'react-router-dom';
import type { Transaction } from '../../types';

interface DashboardTransactionsProps {
  transactions: Transaction[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
}

const DashboardTransactions: React.FC<DashboardTransactionsProps> = ({
  transactions,
  formatCurrency,
  formatDate,
}) => {
  const recentTransactions = transactions.slice(0, 5);

  if (recentTransactions.length === 0) {
    return (
      <div className="xl:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Últimas Transacciones
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Actividad financiera reciente
            </p>
          </div>
        </div>
        <div className="py-16 text-center text-slate-500">
          No hay transacciones aún
        </div>
        <Link
          to="/transactions"
          className="mt-6 flex items-center justify-center rounded-2xl bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
        >
          + Agregar Transacción
        </Link>
      </div>
    );
  }

  return (
    <div className="xl:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Últimas Transacciones
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Actividad financiera reciente
          </p>
        </div>
        <Link
          to="/transactions"
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
        >
          Ver todas →
        </Link>
      </div>

      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                {transaction.category.icon || '💸'}
              </div>
              <div>
                <p className="font-semibold text-white">
                  {transaction.description}
                </p>
                <p className="text-sm text-slate-500">
                  {transaction.category.name} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-slate-500">
                {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/transactions"
        className="mt-6 flex items-center justify-center rounded-2xl bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
      >
        + Agregar Transacción
      </Link>
    </div>
  );
};

export default DashboardTransactions;