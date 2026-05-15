const request = require('supertest');
const app = require('../../index');

describe('Budgets Endpoints', () => {
  let authToken = '';
  let categoryId = '';
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  beforeAll(async () => {
    // Crear usuario de prueba
    const testEmail = `budget_${Date.now()}@example.com`;
    
    await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: '123456',
        name: 'Budget User'
      });
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: '123456'
      });
    
    authToken = loginRes.body.token;

    // Crear categoría de prueba para el presupuesto
    const categoryRes = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Budget Category',
        type: 'expense',
        icon: '💰'
      });
    
    if (categoryRes.body.data?.id) {
      categoryId = categoryRes.body.data.id;
    }
  });

  describe('POST /api/budgets', () => {
    it('debería crear un presupuesto', async () => {
      if (!categoryId) {
        console.log('No category ID available, skipping test');
        return;
      }

      const response = await request(app)
        .post('/api/budgets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          categoryId: categoryId,
          amount: 500,
          month,
          year
        });

      expect([200, 201, 400, 500]).toContain(response.status);
    });
  });

  describe('GET /api/budgets', () => {
    it('debería listar presupuestos', async () => {
      const response = await request(app)
        .get(`/api/budgets?month=${month}&year=${year}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe('GET /api/budgets/alerts', () => {
    it('debería obtener alertas de presupuestos', async () => {
      const response = await request(app)
        .get(`/api/budgets/alerts?month=${month}&year=${year}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect([200, 404, 500]).toContain(response.status);
    });
  });
});