const request = require('supertest');
const app = require('../../index');

describe('Auth Endpoints', () => {
  const testUser = {
    email: `test_${Date.now()}@example.com`,
    password: '123456',
    name: 'Test User'
  };

  let authToken = '';

  describe('POST /api/auth/register', () => {
    it('debería registrar un nuevo usuario', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      console.log('REGISTER RESPONSE:', response.status, response.body);

      expect([200, 201]).toContain(response.status);

      const user =
        response.body.user ||
        response.body.data?.user ||
        response.body.data;

      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(testUser.email);
    });

    it('debería fallar si falta email o password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com' });

      console.log('REGISTER ERROR RESPONSE:', response.status, response.body);

      expect([400, 422, 500]).toContain(response.status);
    });
  });

  describe('POST /api/auth/login', () => {
    it('debería iniciar sesión correctamente', async () => {
      await request(app)
        .post('/api/auth/register')
        .send(testUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      console.log('LOGIN RESPONSE:', response.status, response.body);

      expect([200, 201]).toContain(response.status);

      const token =
        response.body.token ||
        response.body.data?.token;

      expect(token).toBeDefined();

      authToken = token;
    });

    it('debería fallar con credenciales incorrectas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      console.log('LOGIN FAIL RESPONSE:', response.status, response.body);

      expect([400, 401]).toContain(response.status);
    });
  });
});