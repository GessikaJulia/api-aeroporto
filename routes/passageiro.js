// routes/passageiroRoutes.js
const express = require('express');
const router = express.Router();
const passageiroController = require('../controllers/passageiroController');
const { autenticar, somenteAdmin } = require('../middlewares/auth');

// Rotas protegidas

// Qualquer funcionário autenticado pode ver, cadastrar e fazer check-in de passageiros
router.get('/', autenticar, passageiroController.getAll);
router.get('/:id', autenticar, passageiroController.getById);
router.post('/', autenticar, passageiroController.create);
router.patch('/:id/checkin', autenticar, passageiroController.checkin);

// Apenas administradores podem alterar dados cadastrais ou deletar passageiros
router.put('/:id', autenticar, somenteAdmin, passageiroController.update);
router.delete('/:id', autenticar, somenteAdmin, passageiroController.delete);

module.exports = router;