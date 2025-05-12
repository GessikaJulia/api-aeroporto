const express = require('express');
const router = express.Router();
const controller = require('../controllers/vooController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.put('/:id/portao/:portaoId', controller.atribuirPortao);
router.get('/relatorio/hoje', controller.relatorioDiario);

module.exports = router;
