// Categories
export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  isDefault?: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryFormData {
  name: string;
  type: 'income' | 'expense';
  icon: string;
}

// Transactions
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

// Dashboard
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

// Auth
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}