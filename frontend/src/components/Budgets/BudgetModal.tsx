import React, { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  type: string;
}

interface BudgetModalProps {
  isOpen: boolean;
  categories: Category[];
  editingBudget?: {
    id: string;
    categoryId: string;
    amount: number;
  } | null;
  onClose: () => void;
  onSave: (data: { categoryId: string; amount: number }) => void;
  formatCurrency: (value: number) => string;
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  categories,
  editingBudget,
  onClose,
  onSave,
  formatCurrency,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(editingBudget?.categoryId || '');
  const [amount, setAmount] = useState(editingBudget?.amount.toString() || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount <= 0) {
      setError('El presupuesto debe ser mayor a 0');
      return;
    }
    if (!selectedCategoryId) {
      setError('Selecciona una categoría');
      return;
    }
    setError('');
    onSave({ categoryId: selectedCategoryId, amount: numAmount });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white">
            {editingBudget ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
          </h3>
          <p className="text-slate-400 mt-1">
            Define un límite de gasto mensual por categoría
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Categoría
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar categoría</option>
              {expenseCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Presupuesto Mensual
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600"
            >
              {editingBudget ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 py-3 font-semibold text-slate-300 transition hover:bg-slate-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;