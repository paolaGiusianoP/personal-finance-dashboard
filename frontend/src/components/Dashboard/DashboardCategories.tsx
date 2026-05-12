import React from 'react';

interface CategoryStat {
  category: string;
  icon: string;
  total: number;
}

interface DashboardCategoriesProps {
  categories: CategoryStat[];
  formatCurrency: (amount: number) => string;
}

const DashboardCategories: React.FC<DashboardCategoriesProps> = ({
  categories,
  formatCurrency,
}) => {
  if (categories.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Categorías</h2>
          <span className="text-sm text-slate-500">Top gastos</span>
        </div>
        <div className="py-16 text-center text-slate-500">
          No hay datos disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Categorías</h2>
        <span className="text-sm text-slate-500">Top gastos</span>
      </div>

      <div className="space-y-4">
        {categories.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                {stat.icon || '📦'}
              </div>
              <div>
                <p className="font-medium text-white">{stat.category}</p>
                <p className="text-sm text-slate-500">Categoría</p>
              </div>
            </div>
            <p className="font-semibold text-red-400">
              {formatCurrency(stat.total)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCategories;