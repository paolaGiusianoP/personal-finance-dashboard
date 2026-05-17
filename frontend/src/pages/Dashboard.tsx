import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { TransactionList } from '../components/Transactions';
import UserMenu from '../components/Layout/UserMenu';
import DashboardCharts from '../components/Dashboard/DashboardCharts';
import InsightsCard from '../components/Dashboard/InsightsCard';
import { exportSummaryToCSV } from '../utils/exportToCSV';
import { exportSummaryToPDF } from '../utils/exportToPDF';
import toast from 'react-hot-toast';

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

interface MonthlyDataPoint {
  month: string;
  ingresos: number;
  gastos: number;
}

const Dashboard = () => {
  const { user } = useAuth();

  const [summary, setSummary] = useState<Summary>({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [summaryRes, statsRes, transactionsRes] = await Promise.all([
        api.get(`/transactions/summary?period=${period}`),
        api.get(`/transactions/stats/categories?period=${period}`),
        api.get('/transactions'),
      ]);

      setSummary(summaryRes.data.data);
      setCategoryStats(statsRes.data.data.data);
      
      const transactions = transactionsRes.data.data;
      const monthlyMap = new Map<string, { month: string; ingresos: number; gastos: number; order: number }>();
      
      transactions.forEach((t: any) => {
        const date = new Date(t.date);
        const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        const order = date.getTime();
        
        if (!monthlyMap.has(key)) {
          monthlyMap.set(key, { month: monthName, ingresos: 0, gastos: 0, order });
        }
        
        const current = monthlyMap.get(key)!;
        if (t.type === 'income') {
          current.ingresos += t.amount;
        } else {
          current.gastos += t.amount;
        }
      });
      
      const monthlyDataArray = Array.from(monthlyMap.values())
        .sort((a, b) => a.order - b.order)
        .slice(-6);
      
      setMonthlyData(monthlyDataArray);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error al cargar los datos del dashboard');
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

  const handleTransactionChange = () => {
    fetchData();
    toast.success('Datos actualizados', { icon: '🔄' });
  };

  const handleExportCSV = () => {
    exportSummaryToCSV(summary);
    toast.success('Resumen exportado a CSV', { icon: '📊' });
    setShowExportMenu(false);
  };

  const handleExportPDF = () => {
    exportSummaryToPDF(summary, period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Año');
    toast.success('Resumen exportado a PDF', { icon: '📑' });
    setShowExportMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-lg font-bold">$</span>
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Finance Dashboard</h1>
              <p className="text-xs text-slate-400">Personal Finance</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="hidden md:block text-sm text-blue-400 font-medium px-3 py-1.5 rounded-xl transition">
              Dashboard
            </Link>
            <Link to="/transactions" className="hidden md:block text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition">
              Transacciones
            </Link>
            <Link to="/categories" className="hidden md:block text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition">
              Categorías
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            <p className="text-slate-400 mt-1">Resumen financiero y actividad reciente</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Botón Exportar con menú desplegable */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700 flex items-center gap-2"
              >
                📥 Exportar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-800 shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-slate-700 transition"
                  >
                    📊 Exportar a CSV
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-slate-700 transition border-t border-slate-700"
                  >
                    📑 Exportar a PDF
                  </button>
                </div>
              )}
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1">
              {['week', 'month', 'year'].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setShowExportMenu(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    period === p
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {p === 'week' ? 'Semana' : p === 'month' ? 'Mes' : 'Año'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cerrar menú al hacer clic fuera */}
        {showExportMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowExportMenu(false)}
          />
        )}

        {loading ? (
          <div className="flex items-center justify-center h-[600px]">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="h-6 w-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
              Cargando dashboard...
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Ingresos</p>
                    <h3 className="text-3xl font-bold text-green-400">{formatCurrency(summary.income)}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-2xl">📈</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Gastos</p>
                    <h3 className="text-3xl font-bold text-red-400">{formatCurrency(summary.expense)}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-2xl">📉</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Balance</p>
                    <h3 className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(summary.balance)}
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-2xl">⚖️</div>
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="mb-8">
              <InsightsCard />
            </div>

            {/* Charts Section */}
            <div className="mb-8">
              <DashboardCharts
                categoryStats={categoryStats}
                income={summary.income}
                expense={summary.expense}
                period={period}
                monthlyData={monthlyData}
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Categories Section */}
              <div className="xl:col-span-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Categorías</h2>
                  <span className="text-sm text-slate-500">Top gastos</span>
                </div>

                {categoryStats.length > 0 ? (
                  <div className="space-y-4">
                    {categoryStats.slice(0, 5).map((stat, index) => (
                      <div key={index} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">
                            {stat.icon || '📦'}
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">{stat.category}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-red-400 text-sm">{formatCurrency(stat.total)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500">No hay datos disponibles</div>
                )}
              </div>

              {/* Transactions Section */}
              <div className="xl:col-span-2">
                <TransactionList onTransactionChange={handleTransactionChange} limit={5} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;