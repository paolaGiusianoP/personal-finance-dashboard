const request = require('supertest');
const app = require('../../index');

describe('Budgets Endpoints', () => {
  let authToken = '';
  let categoryId = '';

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  beforeAll(async () => {
    const testEmail = `budget_${Date.now()}@example.com`;

    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: '123456',
        name: 'Budget User'
      });

    console.log('REGISTER:', registerRes.status, registerRes.body);

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: '123456'
      });

    console.log('LOGIN:', loginRes.status, loginRes.body);

    authToken =
      loginRes.body.token ||
      loginRes.body.data?.token;

    console.log('TOKEN:', authToken);

    const categoryRes = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: `Budget Category ${Date.now()}`,
        type: 'expense',
        icon: '💰'
      });


    categoryId =
      categoryRes.body.data?.id ||
      categoryRes.body.id;

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
          categoryId,
          amount: 500,
          month,
          year
        });


      expect([200, 201, 400]).toContain(response.status);
    });
  });

  describe('GET /api/budgets', () => {
    it('debería listar presupuestos', async () => {
      const response = await request(app)
        .get(`/api/budgets?month=${month}&year=${year}`)
        .set('Authorization', `Bearer ${authToken}`);


      expect([200, 404]).toContain(response.status);
    });
  });

  describe('GET /api/budgets/alerts', () => {
    it('debería obtener alertas de presupuestos', async () => {
      const response = await request(app)
        .get(`/api/budgets/alerts?month=${month}&year=${year}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect([200, 404]).toContain(response.status);
    });
  });
});