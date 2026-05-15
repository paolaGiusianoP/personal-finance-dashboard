import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import TransactionRow from '../../components/Transactions/TransactionRow';

const mockTransaction = {
  id: '1',
  amount: 150.50,
  type: 'expense' as const,
  description: 'Cena con amigos',
  date: '2024-01-15',
  categoryId: 'cat-123',
  category: {
    id: 'cat-123',
    name: 'Comida',
    icon: '🍕',
    type: 'expense' as const,  
    isDefault: false,
  },
};

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();
const mockFormatCurrency = (val: number) => `$${val}`;
const mockFormatDate = (date: string) => '15/01/2024';

describe('TransactionRow Component', () => {
  it('debería renderizar la información de la transacción', () => {
    render(
      <table>
        <tbody>
          <TransactionRow
            transaction={mockTransaction}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            formatCurrency={mockFormatCurrency}
            formatDate={mockFormatDate}
          />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('Cena con amigos')).toBeDefined();
    expect(screen.getByText('Comida')).toBeDefined();
  });

  it('debería llamar a onEdit al hacer clic en editar', () => {
    render(
      <table>
        <tbody>
          <TransactionRow
            transaction={mockTransaction}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            formatCurrency={mockFormatCurrency}
            formatDate={mockFormatDate}
          />
        </tbody>
      </table>
    );
    
    const editButton = screen.getByText('Editar');
    editButton.click();
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockTransaction);
  });

  it('debería llamar a onDelete al hacer clic en eliminar', () => {
    render(
      <table>
        <tbody>
          <TransactionRow
            transaction={mockTransaction}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            formatCurrency={mockFormatCurrency}
            formatDate={mockFormatDate}
          />
        </tbody>
      </table>
    );
    
    const deleteButton = screen.getByText('Eliminar');
    deleteButton.click();
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});