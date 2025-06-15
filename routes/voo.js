// routes/vooRoutes.js
const express = require('express');
const router = express.Router();
const vooController = require('../controllers/vooController');
const { autenticar, somenteAdmin } = require('../middlewares/auth');

// Rotas protegidas por autenticação e/ou autorização

// Qualquer funcionário autenticado pode ver os voos e o relatório
router.get('/', autenticar, vooController.getAll);
router.get('/relatorio/diario', autenticar, vooController.relatorioDiario);
router.get('/:id', autenticar, vooController.getById);

// Apenas administradores podem criar, alterar e deletar voos
router.post('/', autenticar, somenteAdmin, vooController.create);
router.put('/:id', autenticar, somenteAdmin, vooController.update);
router.patch('/:id/atribuir-portao/:portaoId', autenticar, somenteAdmin, vooController.atribuirPortao);
router.delete('/:id', autenticar, somenteAdmin, vooController.delete);


module.exports = router;