import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import BudgetCard from '../../components/Budgets/BudgetCard';

const mockBudget = {
  categoryName: 'Comida',
  icon: '🍕',
  budget: 1000,
  spent: 600,
  remaining: 400,
  percentage: 60,
};

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();
const mockFormatCurrency = (val: number) => `$${val}`;

describe('BudgetCard Component', () => {
  it('debería renderizar la información del presupuesto', () => {
    render(
      <BudgetCard
        categoryName={mockBudget.categoryName}
        icon={mockBudget.icon}
        budget={mockBudget.budget}
        spent={mockBudget.spent}
        remaining={mockBudget.remaining}
        percentage={mockBudget.percentage}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        formatCurrency={mockFormatCurrency}
      />
    );
    
    expect(screen.getByText('Comida')).toBeDefined();
    expect(screen.getAllByText(/\$1000/).length).toBeGreaterThan(0);
    expect(screen.getByText(/\$600/)).toBeDefined();
  });
});