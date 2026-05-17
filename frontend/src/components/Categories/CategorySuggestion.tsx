import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  icon: string;
  type: string;
}

interface CategorySuggestionProps {
  description: string;
  amount: number;
  categories: Category[];
  onSuggestion: (categoryId: string) => void;
}

const CategorySuggestion: React.FC<CategorySuggestionProps> = ({ 
  description, 
  amount, 
  categories,
  onSuggestion 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const getSuggestion = async () => {
    if (!description || description.length < 3) {
      toast.error('Escribe una descripción más detallada (mínimo 3 caracteres)');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/ai/suggest-category', {
        description,
        amount: amount || 0
      });
      
      if (response.data.category) {
        setSuggestion(response.data.category);
        toast.success(`🤖 Categoría sugerida: ${response.data.category}`, {
          duration: 4000,
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al obtener sugerencia');
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      const matchedCategory = categories.find(
        c => c.name.toLowerCase() === suggestion.toLowerCase()
      );
      
      if (matchedCategory) {
        onSuggestion(matchedCategory.id);
        toast.success(`Categoría "${suggestion}" aplicada`, { icon: '✅' });
        setSuggestion(null);
      } else {
        toast.error(`Categoría "${suggestion}" no encontrada`);
      }
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={getSuggestion}
        disabled={isLoading || !description}
        className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-1 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        {isLoading ? 'Analizando...' : '✨ Sugerir categoría'}
      </button>

      {suggestion && (
        <div className="mt-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-400">SUGERENCIA</span>
            <p className="text-sm text-white font-medium">{suggestion}</p>
          </div>
          <button
            onClick={applySuggestion}
            className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySuggestion;