import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
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
  it('debería renderizar el título de transacciones', () => {
    render(<TransactionList onTransactionChange={() => {}} />);
    
    expect(screen.getAllByText(/transacciones/i).length).toBeGreaterThan(0);
  });

  it('debería mostrar el botón de nueva transacción', () => {
    render(<TransactionList onTransactionChange={() => {}} />);
    
    expect(screen.getByText(/nueva transacción/i)).toBeDefined();
  });
});