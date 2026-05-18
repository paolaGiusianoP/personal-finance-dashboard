import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import TransactionList from '../../components/Transactions/TransactionList';

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: [] } }),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('TransactionList Component', () => {
  it('debería renderizar los filtros', () => {
    render(<TransactionList onTransactionChange={() => {}} />);
    
    expect(screen.getByText(/todos los tipos/i)).toBeDefined();
    expect(screen.getByText(/todas las categorías/i)).toBeDefined();
  });

  it('debería mostrar el botón de limpiar filtros', () => {
    render(<TransactionList onTransactionChange={() => {}} />);
    
    expect(screen.getByText(/limpiar filtros/i)).toBeDefined();
  });
});