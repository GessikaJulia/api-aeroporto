// routes/portaoRoutes.js
const express = require('express');
const router = express.Router();
const portaoController = require('../controllers/portaoController');
const { autenticar, somenteAdmin } = require('../middlewares/auth');

// Rotas protegidas

// Qualquer funcionário autenticado pode ver os portões
router.get('/', autenticar, portaoController.getAll);
router.get('/:id', autenticar, portaoController.getById);

// Apenas administradores podem criar, alterar e deletar portões
router.post('/', autenticar, somenteAdmin, portaoController.create);
router.put('/:id', autenticar, somenteAdmin, portaoController.update);
router.patch('/:id/disponibilidade', autenticar, somenteAdmin, portaoController.updateDisponibilidade);
router.delete('/:id', autenticar, somenteAdmin, portaoController.delete);

module.exports = router;