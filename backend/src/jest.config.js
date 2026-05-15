module.exports = {
  testEnvironment: 'node',

  testMatch: ['**/__tests__/**/*.test.js'],

  setupFilesAfterEnv: [
    '<rootDir>/src/test-utils/jest.setup.js',
  ],

  verbose: true,
};