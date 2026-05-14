const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  type: z.enum(['income', 'expense'], {
    errorMessage: 'Tipo debe ser income o expense',
  }),
  icon: z.string().optional(),
});

const transactionSchema = z.object({
  amount: z.number().positive('El monto debe ser positivo'),
  type: z.enum(['income', 'expense']),
  description: z.string().optional(),
  date: z.string().datetime().or(z.string().date()).optional(),
  categoryId: z.string().min(1, 'Categoría requerida'),
});

const budgetSchema = z.object({
  categoryId: z.string().min(1, 'Categoría requerida'),
  amount: z.number().positive('El presupuesto debe ser positivo'),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(2100),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual requerida'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
});

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.errors.map(e => e.message).join(', '),
      });
    }
  };
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  categorySchema,
  transactionSchema,
  budgetSchema,
  changePasswordSchema,
};