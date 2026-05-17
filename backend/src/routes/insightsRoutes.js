const express = require('express');
const router = express.Router();
const insightsController = require('../controllers/insightsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, insightsController.getInsights);

module.exports = router;