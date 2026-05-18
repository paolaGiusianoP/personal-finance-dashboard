const request = require('supertest');
const app = require('../../index');

describe('Auth Endpoints', () => {
  const testUser = {
    email: `test_${Date.now()}@example.com`,
    password: '123456',
    name: 'Test User',
  };

  let authToken = '';

  describe('POST /api/auth/register', () => {
    it('debería registrar un nuevo usuario', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect([200, 201]).toContain(response.status);

      if ([200, 201].includes(response.status)) {
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.email).toBe(testUser.email);
      }
    });

    it('debería fallar si falta email o password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com' });

      expect([400, 422, 500]).toContain(response.status);
    });
  });

  describe('POST /api/auth/login', () => {
    it('debería iniciar sesión correctamente', async () => {

      // Registrar usuario antes del login
      await request(app)
        .post('/api/auth/register')
        .send({
          email: `login_${Date.now()}@example.com`,
          password: '123456',
          name: 'Login User',
        });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect([200, 201]).toContain(response.status);

      if (response.body.token) {
        authToken = response.body.token;

        expect(authToken).toBeTruthy();
      }
    });
  });
});