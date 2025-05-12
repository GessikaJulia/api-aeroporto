const express = require('express');
const router = express.Router();
const controller = require('../controllers/passageiroController');

router.post('/', controller.create);
router.put('/checkin/:id', controller.checkin);
router.put('/:id', controller.update);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);

module.exports = router;
