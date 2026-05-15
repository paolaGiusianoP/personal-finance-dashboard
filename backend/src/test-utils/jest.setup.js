process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_key';

global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};