const mongoose = require('mongoose');

const FuncionarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  senha: { type: String, required: true },
  cargo: { type: String, enum: ['admin', 'user'], default: 'user' }
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);
