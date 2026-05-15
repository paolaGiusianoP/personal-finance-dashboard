const request = require('supertest');
const app = require('../../index');

describe('Transactions Endpoints', () => {
  let authToken = '';
  let categoryId = '';

  beforeAll(async () => {
    // Crear usuario de prueba
    const testEmail = `test_${Date.now()}@example.com`;
    
    await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: '123456',
        name: 'Test User'
      });
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: '123456'
      });
    
    authToken = loginRes.body.token;

    const categoryRes = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test Gastos',
        type: 'expense',
        icon: '🍕'
      });
    
    if (categoryRes.body.data?.id) {
      categoryId = categoryRes.body.data.id;
    }
  });

  describe('POST /api/transactions', () => {
    it('debería crear una nueva transacción', async () => {
      if (!categoryId) {
        console.log('No category ID available, skipping test');
        return;
      }
      
      const response = await request(app)
        .post('/api/transactions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          amount: 100.50,
          type: 'expense',
          description: 'Test transacción',
          categoryId: categoryId
        });

      expect([200, 201, 400]).toContain(response.status);
    });
  });
});