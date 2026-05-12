import React from 'react';
import type { CategoryFormData } from '../../types';

interface CategoryFormProps {
  formData: CategoryFormData;
  editingCategory: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: CategoryFormData) => void;
  onCancel: () => void;
}

const icons = [
  '💰', '🍔', '🚗', '🏠', '🎬', '🏥', '📚', '💡', '🛍️', '📈', '🎁', '💸', '📦',
  '☕', '🍕', '🍎', '🥗', '🏋️', '💼', '🎓', '✈️', '🎮', '👕', '🧴', '🐶', '🌱',
];

const CategoryForm: React.FC<CategoryFormProps> = ({
  formData,
  editingCategory,
  onSubmit,
  onChange,
  onCancel,
}) => {
  const handleChange = (key: keyof CategoryFormData, value: string) => {
    onChange({ ...formData, [key]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Icono
        </label>
        <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto p-2 border border-slate-700 rounded-2xl bg-slate-800/50">
          {icons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => handleChange('icon', icon)}
              className={`text-2xl p-2 rounded-xl transition ${
                formData.icon === icon
                  ? 'bg-blue-500/20 border border-blue-500'
                  : 'hover:bg-slate-700'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Nombre
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
          placeholder="Ej: Alimentos, Transporte, etc."
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Tipo
        </label>
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

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-2xl bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
        >
          {editingCategory ? 'Actualizar' : 'Guardar'}
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

export default CategoryForm;