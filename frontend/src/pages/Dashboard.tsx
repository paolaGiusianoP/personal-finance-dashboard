import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
  category: {
    name: string;
    icon: string;
  };
}

interface Summary {
  income: number;
  expense: number;
  balance: number;
}

interface CategoryStat {
  category: string;
  icon: string;
  total: number;
}

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const transactionsRes = await api.get('/transactions');

      const summaryRes = await api.get(
        `/transactions/summary?period=${period}`
      );

      const statsRes = await api.get(
        `/transactions/stats/categories?period=${period}`
      );

      setTransactions(transactionsRes.data.data);
      setSummary(summaryRes.data.data);
      setCategoryStats(statsRes.data.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            
            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-xl font-bold">$</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Finance Dashboard
              </h1>

              <p className="text-sm text-slate-400">
                Personal Finance Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            <div className="hidden sm:block text-right">
              <p className="text-sm text-slate-400">
                Bienvenido
              </p>

              <p className="font-semibold text-white">
                {user?.name}
              </p>
            </div>

            <button
              onClick={logout}
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-2
                text-sm
                font-medium
                text-red-400
                transition
                hover:bg-red-500/20
              "
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          
          <div>
            <h2 className="text-3xl font-bold text-white">
              Dashboard
            </h2>

            <p className="text-slate-400 mt-1">
              Resumen financiero y actividad reciente
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1">
            {['week', 'month', 'year'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                  ${
                    period === p
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:bg-slate-800'
                  }
                `}
              >
                {p === 'week'
                  ? 'Semana'
                  : p === 'month'
                  ? 'Mes'
                  : 'Año'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="h-6 w-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
              Cargando dashboard...
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Income */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  
                  <div>
                    <p className="text-sm text-slate-400 mb-2">
                      Ingresos
                    </p>

                    <h3 className="text-3xl font-bold text-green-400">
                      {formatCurrency(summary.income)}
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
                    <p className="text-sm text-slate-400 mb-2">
                      Gastos
                    </p>

                    <h3 className="text-3xl font-bold text-red-400">
                      {formatCurrency(summary.expense)}
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
                    <p className="text-sm text-slate-400 mb-2">
                      Balance
                    </p>

                    <h3
                      className={`text-3xl font-bold ${
                        summary.balance >= 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {formatCurrency(summary.balance)}
                    </h3>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-2xl">
                    ⚖️
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Categories */}
              <div className="xl:col-span-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Categorías
                  </h2>

                  <span className="text-sm text-slate-500">
                    Top gastos
                  </span>
                </div>

                {categoryStats.length > 0 ? (
                  <div className="space-y-4">
                    {categoryStats.map((stat, index) => (
                      <div
                        key={index}
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-slate-800
                          bg-slate-950/50
                          p-4
                        "
                      >
                        <div className="flex items-center gap-3">
                          
                          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                            {stat.icon || '📦'}
                          </div>

                          <div>
                            <p className="font-medium text-white">
                              {stat.category}
                            </p>

                            <p className="text-sm text-slate-500">
                              Categoría
                            </p>
                          </div>
                        </div>

                        <p className="font-semibold text-red-400">
                          {formatCurrency(stat.total)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500">
                    No hay datos disponibles
                  </div>
                )}
              </div>

              {/* Transactions */}
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
                    className="
                      text-sm
                      font-medium
                      text-blue-400
                      hover:text-blue-300
                      transition
                    "
                  >
                    Ver todas →
                  </Link>
                </div>

                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-slate-800
                          bg-slate-950/50
                          p-4
                          transition
                          hover:border-slate-700
                        "
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
                              {transaction.category.name} •{' '}
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p
                            className={`font-bold ${
                              transaction.type === 'income'
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </p>

                          <p className="text-xs text-slate-500">
                            {transaction.type === 'income'
                              ? 'Ingreso'
                              : 'Gasto'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500">
                    No hay transacciones aún
                  </div>
                )}

                {/* Add Transaction */}
                <Link
                  to="/transactions/new"
                  className="
                    mt-6
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-blue-600
                    hover:shadow-lg
                    hover:shadow-blue-500/20
                  "
                >
                  + Agregar Transacción
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;