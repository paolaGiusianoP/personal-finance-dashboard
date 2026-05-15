const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  password: '$2b$10$hashedpassword123',
  name: 'Test User',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockCategory = {
  id: 'cat-123',
  name: 'Comida',
  type: 'expense',
  icon: '🍕',
  isDefault: false,
  userId: 'user-123',
};

const mockTransaction = {
  id: 'trans-123',
  amount: 100.50,
  type: 'expense',
  description: 'Cena con amigos',
  date: new Date(),
  userId: 'user-123',
  categoryId: 'cat-123',
};

const mockBudget = {
  id: 'budget-123',
  amount: 500,
  spent: 250,
  remaining: 250,
  percentage: 50,
  month: 1,
  year: 2024,
  categoryId: 'cat-123',
  userId: 'user-123',
};

module.exports = {
  mockUser,
  mockCategory,
  mockTransaction,
  mockBudget,
};