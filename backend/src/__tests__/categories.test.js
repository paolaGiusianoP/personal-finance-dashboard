const request = require('supertest');
const app = require('../index');

describe('Categories API', () => {
  describe('GET /api/categories', () => {
    it('debería requerir autenticación', async () => {
      const response = await request(app).get('/api/categories');
      expect(response.status).toBe(401);
    });
  });
});