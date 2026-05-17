import React from 'react';
import type { Category, TransactionFormData } from '../../types';
import CategorySuggestion from '../Categories/CategorySuggestion';

interface TransactionFormProps {
  formData: TransactionFormData;
  categories: Category[];
  editingTransaction: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: TransactionFormData) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  formData,
  categories,
  editingTransaction,
  onSubmit,
  onChange,
  onCancel,
}) => {
  const filteredCategories = categories.filter((c) => c.type === formData.type);

  const handleChange = (key: keyof TransactionFormData, value: string) => {
    onChange({ ...formData, [key]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Tipo</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleChange('type', 'expense')}
            className={`rounded-2xl border px-4 py-3 font-medium transition ${
              formData.type === 'expense'
                ? 'border-red-500 bg-red-500/10 text-red-400'
                : 'border-slate-700 bg-slate-800 text-slate-400'
            }`}
          >
            📉 Gasto
          </button>
          <button
            type="button"
            onClick={() => handleChange('type', 'income')}
            className={`rounded-2xl border px-4 py-3 font-medium transition ${
              formData.type === 'income'
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-slate-700 bg-slate-800 text-slate-400'
            }`}
          >
            📈 Ingreso
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Monto</label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          required
          placeholder="0.00"
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Categoría</label>
        <select
          value={formData.categoryId}
          onChange={(e) => handleChange('categoryId', e.target.value)}
          required
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar categoría</option>
          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Descripción</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Ej: Supermercado"
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <CategorySuggestion
          description={formData.description}
          amount={parseFloat(formData.amount) || 0}
          categories={categories}
          onSuggestion={(categoryId) => {
            onChange({ ...formData, categoryId });  
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Fecha</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          required
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-2xl bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
        >
          {editingTransaction ? 'Actualizar' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 py-3 font-semibold text-slate-300 transition hover:bg-slate-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;