const express = require('express');
const router = express.Router();
const controller = require('../controllers/funcionarioController');

router.post('/cadastrar', controller.cadastrar);
router.post('/login', controller.login);

module.exports = router;
