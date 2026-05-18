import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Transactions from '../../pages/Transactions';

vi.mock('../../../services/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: [] } }),
  },
}));

describe('Transactions Page', () => {
  it('debería renderizar el título de la página', () => {
    render(<Transactions />);
    
    expect(screen.getByText(/Administra ingresos y gastos/i)).toBeDefined();
  });

  it('debería mostrar el botón + Nueva Transacción', () => {
    render(<Transactions />);
    
    expect(screen.getByText(/nueva transacción/i)).toBeDefined();
  });
});