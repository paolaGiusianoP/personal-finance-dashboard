import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Transactions from '../../pages/Transactions';

vi.mock('../../../services/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: [] } }),
  },
}));

describe('Transactions Page', () => {
  it('debería renderizar la página de transacciones', () => {
    render(<Transactions />);
    
    expect(screen.getAllByText(/transacciones/i).length).toBeGreaterThan(0);
  });

  it('debería mostrar el botón de exportar', () => {
    render(<Transactions />);
    
    expect(screen.getByText(/exportar/i)).toBeDefined();
  });
});