import React from 'react';

const CategorySkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex items-center gap-3 text-slate-400">
        <div className="h-6 w-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
        Cargando categorías...
      </div>
    </div>
  );
};

export default CategorySkeleton;