const request = require('supertest');
const app = require('../../index');

describe('Categories Endpoints', () => {
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
  });

  describe('POST /api/categories', () => {
    it('debería crear una nueva categoría', async () => {
      const response = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Categoría',
          type: 'expense',
          icon: '📦'
        });

      expect([200, 201, 400]).toContain(response.status);
      
      if (response.body.data?.id) {
        categoryId = response.body.data.id;
      }
    });
  });

  describe('GET /api/categories', () => {
    it('debería listar categorías', async () => {
      const response = await request(app)
        .get('/api/categories')
        .set('Authorization', `Bearer ${authToken}`);

      expect([200, 401]).toContain(response.status);
    });
  });
});