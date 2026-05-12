import React from 'react';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const getTypeLabel = (type: string) => {
    return type === 'income' ? 'Ingreso' : 'Gasto';
  };

  const getTypeStyles = (type: string) => {
    return type === 'income'
      ? 'bg-green-500/10 text-green-400'
      : 'bg-red-500/10 text-red-400';
  };

  return (
    <div className="border border-slate-800 rounded-2xl p-4 hover:shadow-lg hover:border-slate-700 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl">
            {category.icon || '📦'}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">
              {category.name}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getTypeStyles(
                category.type
              )}`}
            >
              {getTypeLabel(category.type)}
            </span>
          </div>
        </div>

        {!category.isDefault && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(category)}
              className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      {category.isDefault && (
        <p className="text-xs text-slate-500 mt-2">Categoría por defecto</p>
      )}
    </div>
  );
};

export default CategoryCard;