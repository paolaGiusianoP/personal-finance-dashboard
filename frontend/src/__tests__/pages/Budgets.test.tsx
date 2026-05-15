import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Budgets from '../../pages/Budgets';

vi.mock('../../../services/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: [] } }),
  },
}));

vi.mock('../../../services/budgetService', () => ({
  getBudgets: vi.fn().mockResolvedValue([]),
  getBudgetAlerts: vi.fn().mockResolvedValue([]),
  createOrUpdateBudget: vi.fn(),
  deleteBudget: vi.fn(),
}));

describe('Budgets Page', () => {
  it('debería renderizar la página de presupuestos', () => {
    render(<Budgets />);
    
    expect(screen.getAllByText(/presupuestos/i).length).toBeGreaterThan(0);
  });

  it('debería mostrar el botón de nuevo presupuesto', () => {
    render(<Budgets />);
    
    expect(screen.getByText(/nuevo presupuesto/i)).toBeDefined();
  });
});