import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface Insight {
  type: 'warning' | 'info' | 'success';
  icon: string;
  title: string;
  description: string;
  suggestion: string;
}

const InsightsCard = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await api.get('/insights');
      setInsights(response.data.data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-orange-500/30 bg-orange-500/10';
      case 'success':
        return 'border-green-500/30 bg-green-500/10';
      default:
        return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900/80 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">Insights</h3>
        </div>
        <div className="text-center text-slate-400">Cargando insights...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-white">Insights Inteligentes</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getTypeStyles(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{insight.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{insight.title}</h4>
                <p className="text-sm text-slate-300 mt-1">{insight.description}</p>
                <p className="text-xs text-slate-400 mt-2">💡 {insight.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsCard;