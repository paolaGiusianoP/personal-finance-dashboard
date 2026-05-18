const request = require('supertest');
const app = require('../index');

describe('Categories API', () => {
  describe('GET /api/categories', () => {
    it('debería requerir autenticación', async () => {
      const response = await request(app).get('/api/categories');

      console.log('CATEGORIES WITHOUT AUTH:', response.status, response.body);

      expect([401, 403]).toContain(response.status);
    });
  });
});