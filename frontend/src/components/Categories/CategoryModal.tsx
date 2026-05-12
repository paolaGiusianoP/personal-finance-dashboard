import React from 'react';
import CategoryForm from './CategoryForm';
import type { CategoryFormData } from '../../types';

interface CategoryModalProps {
  isOpen: boolean;
  editingCategory: boolean;
  formData: CategoryFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: CategoryFormData) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  editingCategory,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white">
            {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
          </h3>
          <p className="text-slate-400 mt-1">
            {editingCategory
              ? 'Actualiza los datos de la categoría'
              : 'Crea una nueva categoría para organizar tus transacciones'}
          </p>
        </div>

        <CategoryForm
          formData={formData}
          editingCategory={editingCategory}
          onSubmit={onSubmit}
          onChange={onFormChange}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default CategoryModal;