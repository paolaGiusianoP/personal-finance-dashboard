export interface Category {
  id: string;
  name: string;
  type: string;
  icon: string;
  isDefault?: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
  categoryId: string;
  category: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFormData {
  amount: string;
  type: 'income' | 'expense';
  description: string;
  date: string;
  categoryId: string;
}

export interface Filters {
  type: string;
  categoryId: string;
  startDate: string;
  endDate: string;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
  period?: string;
  startDate?: string;
  endDate?: string;
}

export interface CategoryStat {
  category: string;
  icon: string;
  total: number;
  type?: string;
}

export interface DashboardData {
  transactions: Transaction[];
  summary: Summary;
  categoryStats: CategoryStat[];
}