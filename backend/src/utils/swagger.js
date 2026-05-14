const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Finance Dashboard API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://tu-api-produccion.com/api',
        description: 'Servidor de producción',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa tu token JWT: Bearer <token>',
        },
      },
      schemas: {
        // User Schema
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cmpxxxxx' },
            email: { type: 'string', format: 'email', example: 'usuario@ejemplo.com' },
            name: { type: 'string', example: 'Usuario Test' },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
          },
        },
        
        // Category Schema
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cmpxxxxx' },
            name: { type: 'string', example: 'Comida' },
            type: { type: 'string', enum: ['income', 'expense'], example: 'expense' },
            icon: { type: 'string', example: '🍕' },
            isDefault: { type: 'boolean', example: false },
            userId: { type: 'string', example: 'cmpxxxxx' },
          },
        },
        
        // Transaction Schema
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cmpxxxxx' },
            amount: { type: 'number', example: 150.50 },
            type: { type: 'string', enum: ['income', 'expense'], example: 'expense' },
            description: { type: 'string', example: 'Cena con amigos' },
            date: { type: 'string', format: 'date', example: '2024-01-15' },
            categoryId: { type: 'string', example: 'cmpxxxxx' },
            category: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                icon: { type: 'string' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        
        // Budget Schema
        Budget: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cmpxxxxx' },
            amount: { type: 'number', description: 'Límite del presupuesto', example: 5000 },
            spent: { type: 'number', description: 'Total gastado', example: 3250 },
            remaining: { type: 'number', description: 'Presupuesto restante', example: 1750 },
            percentage: { type: 'number', description: 'Porcentaje gastado', example: 65 },
            month: { type: 'integer', minimum: 1, maximum: 12, example: 1 },
            year: { type: 'integer', example: 2024 },
            category: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                icon: { type: 'string' },
                type: { type: 'string' },
              },
            },
          },
        },
        
        // Budget Alert Schema
        BudgetAlert: {
          type: 'object',
          properties: {
            category: { type: 'string', example: 'Comida' },
            spent: { type: 'number', example: 4500 },
            budget: { type: 'number', example: 5000 },
            percentage: { type: 'number', example: 90 },
            remaining: { type: 'number', example: 500 },
            level: { type: 'string', enum: ['danger', 'warning', 'info'], example: 'warning' },
          },
        },
        
        // Financial Summary Schema
        Summary: {
          type: 'object',
          properties: {
            period: { type: 'string', example: 'month' },
            income: { type: 'number', example: 15000 },
            expense: { type: 'number', example: 8000 },
            balance: { type: 'number', example: 7000 },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
          },
        },
        
        // Category Stat Schema
        CategoryStat: {
          type: 'object',
          properties: {
            category: { type: 'string', example: 'Comida' },
            icon: { type: 'string', example: '🍕' },
            total: { type: 'number', example: 2500 },
          },
        },
        
        // Error Schema
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Mensaje de error descriptivo' },
          },
        },
        
        // Success Response Schema
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operación exitosa' },
            data: { type: 'object' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Autenticación y gestión de usuarios' },
      { name: 'Categories', description: 'Gestión de categorías' },
      { name: 'Transactions', description: 'Gestión de transacciones' },
      { name: 'Budgets', description: 'Gestión de presupuestos' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);