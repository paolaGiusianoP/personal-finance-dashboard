import React from 'react';

interface BudgetCardProps {
  categoryName: string;
  icon: string;
  budget: number;
  spent: number;
  remaining: number;
  percentage: number;
  onEdit?: () => void;
  onDelete?: () => void;
  formatCurrency: (value: number) => string;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  categoryName,
  icon,
  budget,
  spent,
  remaining,
  percentage,
  onEdit,
  onDelete,
  formatCurrency,
}) => {
  const getProgressColor = () => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (percentage >= 100) return '¡Límite excedido!';
    if (percentage >= 80) return 'Cerca del límite';
    if (percentage >= 60) return 'Progreso moderado';
    return 'Dentro del presupuesto';
  };

  const getStatusColor = () => {
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 80) return 'text-orange-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
            {icon || '📊'}
          </div>
          <div>
            <h3 className="font-semibold text-white">{categoryName}</h3>
            <p className="text-xs text-slate-400">
              Presupuesto: {formatCurrency(budget)}
            </p>
          </div>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 text-sm hover:bg-blue-500/20 transition"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition"
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">Gastado</span>
          <span className={getStatusColor()}>
            {formatCurrency(spent)} / {formatCurrency(budget)} ({percentage.toFixed(0)}%)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Estado */}
      <div className="flex justify-between items-center">
        <p className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </p>
        <p className="text-sm text-slate-400">
          Restante: {formatCurrency(remaining < 0 ? 0 : remaining)}
        </p>
      </div>

      {/* Alerta si supera el presupuesto */}
      {percentage >= 100 && (
        <div className="mt-3 p-2 rounded-xl bg-red-500/20 border border-red-500/30">
          <p className="text-xs text-red-400 text-center">
            ⚠️ Has superado el presupuesto de {categoryName}!
          </p>
        </div>
      )}
      {percentage >= 80 && percentage < 100 && (
        <div className="mt-3 p-2 rounded-xl bg-orange-500/20 border border-orange-500/30">
          <p className="text-xs text-orange-400 text-center">
            ⚠️ Estás cerca del límite de {categoryName}
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;