import React from 'react';

interface DashboardSummaryProps {
  income: number;
  expense: number;
  balance: number;
  formatCurrency: (amount: number) => string;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  income,
  expense,
  balance,
  formatCurrency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Income */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-2">Ingresos</p>
            <h3 className="text-3xl font-bold text-green-400">
              {formatCurrency(income)}
            </h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-2xl">
            📈
          </div>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-2">Gastos</p>
            <h3 className="text-3xl font-bold text-red-400">
              {formatCurrency(expense)}
            </h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-2xl">
            📉
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-2">Balance</p>
            <h3
              className={`text-3xl font-bold ${
                balance >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {formatCurrency(balance)}
            </h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-2xl">
            ⚖️
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;