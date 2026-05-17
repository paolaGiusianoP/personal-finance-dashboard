import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { TransactionList } from '../components/Transactions';
import UserMenu from '../components/Layout/UserMenu';
import { exportTransactionsToCSV, exportSummaryToCSV } from '../utils/exportToCSV';
import { exportTransactionsToPDF, exportSummaryToPDF } from '../utils/exportToPDF';
import toast from 'react-hot-toast';

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

const Transactions = () => {
  const { user } = useAuth();
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [showTransactionsMenu, setShowTransactionsMenu] = useState(false);
  const [showSummaryMenu, setShowSummaryMenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionsRes, summaryRes] = await Promise.all([
        api.get('/transactions'),
        api.get('/transactions/summary?period=month'),
      ]);
      setAllTransactions(transactionsRes.data.data);
      setSummary(summaryRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  const handleExportTransactionsCSV = () => {
    if (allTransactions.length === 0) {
      toast.error('No hay transacciones para exportar');
      return;
    }
    exportTransactionsToCSV(allTransactions, 'mis_transacciones');
    toast.success(`${allTransactions.length} transacciones exportadas a CSV`, { icon: '📄' });
    setShowTransactionsMenu(false);
  };

  const handleExportTransactionsPDF = () => {
    if (allTransactions.length === 0) {
      toast.error('No hay transacciones para exportar');
      return;
    }
    exportTransactionsToPDF(allTransactions, 'Todas');
    toast.success(`${allTransactions.length} transacciones exportadas a PDF`, { icon: '📑' });
    setShowTransactionsMenu(false);
  };

  const handleExportSummaryCSV = () => {
    exportSummaryToCSV(summary);
    toast.success('Resumen exportado a CSV', { icon: '📊' });
    setShowSummaryMenu(false);
  };

  const handleExportSummaryPDF = () => {
    exportSummaryToPDF(summary, 'Mes actual');
    toast.success('Resumen exportado a PDF', { icon: '📑' });
    setShowSummaryMenu(false);
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
            <Link to="/dashboard" className="hidden md:block text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition">
              Dashboard
            </Link>
            <Link to="/transactions" className="hidden md:block text-sm text-blue-400 font-medium px-3 py-1.5 rounded-xl transition">
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Transacciones</h2>
            <p className="text-slate-400 mt-1">Administra ingresos y gastos</p>
          </div>

          <div className="flex gap-3">
            {/* Botón Exportar Transacciones */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTransactionsMenu(!showTransactionsMenu);
                  setShowSummaryMenu(false);
                }}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 font-semibold text-white transition-all hover:bg-slate-700 flex items-center gap-2"
              >
                📋 Transacciones
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showTransactionsMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-800 shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={handleExportTransactionsCSV}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-slate-700 transition"
                  >
                    📄 Exportar a CSV
                  </button>
                  <button
                    onClick={handleExportTransactionsPDF}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-slate-700 transition border-t border-slate-700"
                  >
                    📑 Exportar a PDF
                  </button>
                </div>
              )}
            </div>

            {/* Botón Exportar Resumen */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSummaryMenu(!showSummaryMenu);
                  setShowTransactionsMenu(false);
                }}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 font-semibold text-white transition-all hover:bg-slate-700 flex items-center gap-2"
              >
                📊 Resumen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showSummaryMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-800 shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={handleExportSummaryCSV}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-slate-700 transition"
                  >
                    📊 Exportar a CSV
                  </button>
                  <button
                    onClick={handleExportSummaryPDF}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-slate-700 transition border-t border-slate-700"
                  >
                    📑 Exportar a PDF
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Cerrar menús al hacer clic fuera */}
        {(showTransactionsMenu || showSummaryMenu) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowTransactionsMenu(false);
              setShowSummaryMenu(false);
            }}
          />
        )}

        {/* Tarjetas de resumen */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Ingresos</p>
                  <h3 className="text-2xl font-bold text-green-400">
                    {new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(summary.income)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-xl">📈</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Gastos</p>
                  <h3 className="text-2xl font-bold text-red-400">
                    {new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(summary.expense)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-xl">📉</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Balance</p>
                  <h3 className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(summary.balance)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">⚖️</div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de transacciones */}
        <TransactionList onTransactionChange={fetchData} />
      </main>
    </div>
  );
};

export default Transactions;