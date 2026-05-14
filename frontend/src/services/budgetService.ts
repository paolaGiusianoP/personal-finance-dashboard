import api from './api';

export interface Budget {
  id: string;
  amount: number;
  spent: number;
  remaining: number;
  percentage: number;
  month: number;
  year: number;
  category: {
    id: string;
    name: string;
    icon: string;
    type: string;
  };
}

export interface BudgetAlert {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
  remaining: number;
  level: 'danger' | 'warning' | 'info';
}

export const getBudgets = async (month: number, year: number) => {
  const response = await api.get(`/budgets?month=${month}&year=${year}`);
  return response.data.data;
};

export const createOrUpdateBudget = async (data: {
  categoryId: string;
  amount: number;
  month: number;
  year: number;
}) => {
  const response = await api.post('/budgets', data);
  return response.data.data;
};

export const deleteBudget = async (id: string) => {
  await api.delete(`/budgets/${id}`);
};

export const getBudgetAlerts = async (month: number, year: number) => {
  const response = await api.get(`/budgets/alerts?month=${month}&year=${year}`);
  return response.data.data;
};