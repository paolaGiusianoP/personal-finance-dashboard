import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';

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

interface DashboardChartsProps {
  categoryStats: CategoryStat[];
  income: number;
  expense: number;
  period: string;
  monthlyData?: MonthlyDataPoint[];
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const DashboardCharts: React.FC<DashboardChartsProps> = ({ 
  categoryStats, 
  income, 
  expense, 
  period,
  monthlyData = [] 
}) => {
  const barData = [
    { name: 'Ingresos', amount: income, color: '#10b981' },
    { name: 'Gastos', amount: expense, color: '#ef4444' },
  ];

  const pieData = categoryStats.map((stat) => ({
    name: stat.category,
    value: stat.total,
    icon: stat.icon,
  }));

  const hasMonthlyData = monthlyData.length > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-sm text-green-400">
            Ingresos: {formatCurrency(payload[0]?.value || 0)}
          </p>
          <p className="text-sm text-red-400">
            Gastos: {formatCurrency(payload[1]?.value || 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-medium text-white">
            {data.name} {data.icon}
          </p>
          <p className="text-sm text-red-400">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Gráfico de Ingresos vs Gastos */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">Ingresos vs Gastos</h3>
          <p className="text-sm text-slate-400 mt-1">
            Comparativa del período ({period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Año'})
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Torta - Gastos por Categoría */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">Gastos por Categoría</h3>
            <p className="text-sm text-slate-400 mt-1">Distribución de tus gastos</p>
          </div>

          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => {
                    const percentage = percent ? (percent * 100).toFixed(0) : 0;
                    return `${name} ${percentage}%`;
                  }}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-500">
              No hay datos de gastos para mostrar
            </div>
          )}
        </div>

        {/* Evolución Mensual */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">Evolución Mensual</h3>
            <p className="text-sm text-slate-400 mt-1">Tendencia de ingresos y gastos</p>
          </div>
          
          {hasMonthlyData ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                  name="Ingresos"
                />
                <Line
                  type="monotone"
                  dataKey="gastos"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2 }}
                  name="Gastos"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-500">
              No hay datos suficientes para mostrar la evolución mensual
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;