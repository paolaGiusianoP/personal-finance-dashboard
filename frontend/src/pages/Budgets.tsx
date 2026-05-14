import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import UserMenu from '../components/Layout/UserMenu';
import BudgetCard from '../components/Budgets/BudgetCard';
import BudgetModal from '../components/Budgets/BudgetModal';
import { getBudgets, createOrUpdateBudget, deleteBudget, getBudgetAlerts } from '../services/budgetService';
import type { Budget, BudgetAlert } from '../services/budgetService';

const Budgets = () => {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<{ id: string; categoryId: string; amount: number } | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [alerts, setAlerts] = useState<BudgetAlert[]>([]);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [budgetsRes, categoriesRes, alertsRes] = await Promise.all([
        getBudgets(selectedMonth, selectedYear),
        api.get('/categories'),
        getBudgetAlerts(selectedMonth, selectedYear),
      ]);
      setBudgets(budgetsRes);
      setCategories(categoriesRes.data.data);
      setAlerts(alertsRes);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
    }).format(value);
  };

  const handleSaveBudget = async (data: { categoryId: string; amount: number }) => {
    await createOrUpdateBudget({
      ...data,
      month: selectedMonth,
      year: selectedYear,
    });
    setShowModal(false);
    setEditingBudget(null);
    fetchData();
  };

  const handleDeleteBudget = async (id: string) => {
    if (window.confirm('¿Eliminar este presupuesto?')) {
      await deleteBudget(id);
      fetchData();
    }
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget({
      id: budget.id,
      categoryId: budget.category.id,
      amount: budget.amount,
    });
    setShowModal(true);
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const years = [2024, 2025, 2026];

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
              <p className="text-xs text-slate-400">Presupuestos</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="hidden md:block text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition">
              Dashboard
            </Link>
            <Link to="/transactions" className="hidden md:block text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition">
              Transacciones
            </Link>
            <Link to="/categories" className="hidden md:block text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition">
              Categorías
            </Link>
            <Link to="/budgets" className="hidden md:block text-sm text-blue-400 font-medium px-3 py-1.5 rounded-xl transition">
              Presupuestos
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Presupuestos</h2>
            <p className="text-slate-400 mt-1">Controla tus límites de gasto mensuales</p>
          </div>

          <div className="flex gap-3">
            {/* Selector de mes y año */}
            <div className="flex gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2 text-white"
              >
                {months.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2 text-white"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setEditingBudget(null);
                setShowModal(true);
              }}
              className="rounded-2xl bg-blue-500 px-5 py-2 font-semibold text-white transition-all hover:bg-blue-600"
            >
              + Nuevo Presupuesto
            </button>
          </div>
        </div>

        {/* Alertas */}
        {alerts.length > 0 && (
          <div className="mb-6 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚠️</span>
              <h3 className="font-semibold text-orange-400">Alertas de presupuesto</h3>
            </div>
            <div className="space-y-1">
              {alerts.map((alert, index) => (
                <p key={index} className="text-sm text-orange-300">
                  {alert.category}: has gastado {formatCurrency(alert.spent)} de {formatCurrency(alert.budget)} ({alert.percentage.toFixed(0)}%)
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Lista de presupuestos */}
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="h-6 w-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
              Cargando presupuestos...
            </div>
          </div>
        ) : budgets.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl py-16 text-center text-slate-500">
            No hay presupuestos para {months[selectedMonth - 1]} de {selectedYear}
            <br />
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              + Crear tu primer presupuesto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                categoryName={budget.category.name}
                icon={budget.category.icon}
                budget={budget.amount}
                spent={budget.spent}
                remaining={budget.remaining}
                percentage={budget.percentage}
                onEdit={() => handleEditBudget(budget)}
                onDelete={() => handleDeleteBudget(budget.id)}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        )}
      </main>

      <BudgetModal
        isOpen={showModal}
        categories={categories}
        editingBudget={editingBudget}
        onClose={() => {
          setShowModal(false);
          setEditingBudget(null);
        }}
        onSave={handleSaveBudget}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default Budgets;