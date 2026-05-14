const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Budgets
 *   description: Gestión de presupuestos mensuales
 */

/**
 * @swagger
 * /budgets:
 *   get:
 *     summary: Obtener todos los presupuestos del usuario
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           default: 1
 *         description: Mes del presupuesto (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           default: 2024
 *         description: Año del presupuesto
 *     responses:
 *       200:
 *         description: Lista de presupuestos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Budget'
 *       401:
 *         description: No autorizado
 */
router.get('/', budgetController.getBudgets);

/**
 * @swagger
 * /budgets:
 *   post:
 *     summary: Crear o actualizar un presupuesto
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - amount
 *               - month
 *               - year
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: ID de la categoría
 *                 example: "cmpxxxxx"
 *               amount:
 *                 type: number
 *                 description: Límite de presupuesto
 *                 example: 5000
 *               month:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 description: Mes del presupuesto (1-12)
 *                 example: 1
 *               year:
 *                 type: integer
 *                 description: Año del presupuesto
 *                 example: 2024
 *     responses:
 *       200:
 *         description: Presupuesto guardado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Budget'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Categoría no encontrada
 */
router.post('/', budgetController.createOrUpdateBudget);

/**
 * @swagger
 * /budgets/{id}:
 *   delete:
 *     summary: Eliminar un presupuesto
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del presupuesto
 *     responses:
 *       200:
 *         description: Presupuesto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Presupuesto eliminado"
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Presupuesto no encontrado
 */
router.delete('/:id', budgetController.deleteBudget);

/**
 * @swagger
 * /budgets/alerts:
 *   get:
 *     summary: Obtener alertas de presupuestos
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           default: 1
 *         description: Mes a verificar (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           default: 2024
 *         description: Año a verificar
 *     responses:
 *       200:
 *         description: Lista de alertas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                       spent:
 *                         type: number
 *                       budget:
 *                         type: number
 *                       percentage:
 *                         type: number
 *                       remaining:
 *                         type: number
 *                       level:
 *                         type: string
 *                         enum: [danger, warning, info]
 *       401:
 *         description: No autorizado
 */
router.get('/alerts', budgetController.getAlerts);

module.exports = router;