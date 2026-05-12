import React from 'react';

interface DashboardPeriodSelectorProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

const DashboardPeriodSelector: React.FC<DashboardPeriodSelectorProps> = ({
  period,
  onPeriodChange,
}) => {
  const periods = [
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mes' },
    { value: 'year', label: 'Año' },
  ];

  return (
    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onPeriodChange(p.value)}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition
            ${
              period === p.value
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:bg-slate-800'
            }
          `}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

export default DashboardPeriodSelector;