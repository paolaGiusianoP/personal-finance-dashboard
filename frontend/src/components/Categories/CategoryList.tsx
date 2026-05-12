import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import CategorySkeleton from './CategorySkeleton';
import api from '../../services/api';
import type { Category, CategoryFormData } from '../../types';

interface CategoryListProps {
  onCategoryChange?: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    type: 'expense',
    icon: '📦',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, formData);
      } else {
        await api.post('/categories', formData);
      }
      resetForm();
      fetchCategories();
      onCategoryChange?.();
    } catch (error: any) {
      console.error('Error saving category:', error);
      alert(error.response?.data?.error || 'Error al guardar la categoría');
    }
  };

  const handleDelete = async (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (category?.isDefault) {
      alert('No se pueden eliminar categorías por defecto');
      return;
    }

    if (!window.confirm('¿Eliminar esta categoría?')) return;

    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
      onCategoryChange?.();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      alert(error.response?.data?.error || 'Error al eliminar la categoría');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      icon: category.icon || '📦',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      type: 'expense',
      icon: '📦',
    });
    setShowModal(false);
  };

  if (loading) {
    return <CategorySkeleton />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Categorías</h2>
          <p className="text-slate-400 mt-1">
            Administra tus categorías de ingresos y gastos
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
        >
          + Nueva Categoría
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl py-24 text-center text-slate-500">
          No hay categorías. ¡Crea tu primera categoría!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={showModal}
        editingCategory={!!editingCategory}
        formData={formData}
        onClose={resetForm}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
      />
    </>
  );
};

export default CategoryList;