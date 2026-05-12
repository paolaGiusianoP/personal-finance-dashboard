import React from 'react';
import TransactionForm from './TransactionForm';
import type { Category, TransactionFormData } from '../../types';

interface TransactionModalProps {
  isOpen: boolean;
  editingTransaction: boolean;
  formData: TransactionFormData;
  categories: Category[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: TransactionFormData) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  editingTransaction,
  formData,
  categories,
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
            {editingTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
          </h3>
          <p className="text-slate-400 mt-1">Completa los datos de la transacción</p>
        </div>

        <TransactionForm
          formData={formData}
          categories={categories}
          editingTransaction={editingTransaction}
          onSubmit={onSubmit}
          onChange={onFormChange}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default TransactionModal;