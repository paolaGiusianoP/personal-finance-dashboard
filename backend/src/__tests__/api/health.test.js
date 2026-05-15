const request = require('supertest');
const app = require('../../index');

describe('Health Check', () => {
  it('GET /health - debería retornar 200 y status OK', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.services).toHaveProperty('server');
    expect(response.body.services).toHaveProperty('database');
  });
});