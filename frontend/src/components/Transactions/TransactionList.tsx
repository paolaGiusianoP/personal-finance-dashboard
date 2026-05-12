import React, { useState, useEffect } from 'react';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';
import TransactionModal from './TransactionModal';
import api from '../../services/api';
import type { Category, Transaction, TransactionFormData, Filters } from '../../types';

interface TransactionListProps {
  onTransactionChange?: () => void;
  limit?: number; 
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  onTransactionChange, 
  limit 
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<Filters>({
    type: '',
    categoryId: '',
    startDate: '',
    endDate: '',
  });
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: '',
    type: 'expense',
    description: '',
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const [transactionsRes, categoriesRes] = await Promise.all([
        api.get(`/transactions?${params.toString()}`),
        api.get('/categories'),
      ]);

      setTransactions(transactionsRes.data.data);
      setCategories(categoriesRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        amount: parseFloat(formData.amount),
        type: formData.type,
        description: formData.description,
        date: formData.date,
        categoryId: formData.categoryId,
      };

      if (editingTransaction) {
        await api.put(`/transactions/${editingTransaction.id}`, data);
      } else {
        await api.post('/transactions', data);
      }

      resetForm();
      fetchData();
      onTransactionChange?.();
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Error al guardar la transacción');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar esta transacción?')) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchData();
      onTransactionChange?.();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Error al eliminar la transacción');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      amount: transaction.amount.toString(),
      type: transaction.type,
      description: transaction.description || '',
      date: transaction.date.split('T')[0],
      categoryId: transaction.categoryId,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingTransaction(null);
    setFormData({
      amount: '',
      type: 'expense',
      description: '',
      date: new Date().toISOString().split('T')[0],
      categoryId: '',
    });
    setShowModal(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES');
  };

  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Transacciones</h2>
          <p className="text-slate-400 mt-1">Administra ingresos y gastos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
        >
          + Nueva Transacción
        </button>
      </div>

      {!limit && (
        <TransactionFilters
          filters={filters}
          categories={categories}
          onFilterChange={setFilters}
          onClearFilters={() =>
            setFilters({ type: '', categoryId: '', startDate: '', endDate: '' })
          }
        />
      )}

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl">
        <TransactionTable
          transactions={displayTransactions} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </div>

      <TransactionModal
        isOpen={showModal}
        editingTransaction={!!editingTransaction}
        formData={formData}
        categories={categories}
        onClose={resetForm}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
      />
    </>
  );
};

export default TransactionList;