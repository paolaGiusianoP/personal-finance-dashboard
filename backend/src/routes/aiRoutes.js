const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/suggest-category', authMiddleware, aiController.getCategorySuggestion);

module.exports = router;