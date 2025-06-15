// routes/funcionarioRoutes.js
const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rotas públicas
router.post('/register', funcionarioController.create);
router.post('/login', funcionarioController.login);

module.exports = router;