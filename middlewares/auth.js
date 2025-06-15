// middlewares/auth.js
const jwt = require('jsonwebtoken');
const Funcionario = require('../models/funcionario');

exports.autenticar = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.funcionario = await Funcionario.findById(decoded.id);
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

exports.somenteAdmin = (req, res, next) => {
  if (req.funcionario.cargo !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Somente administradores.' });
  }
  next();
};