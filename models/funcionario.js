// models/funcionario.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const FuncionarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  senha: { type: String, required: true, select: false },
  cargo: { type: String, enum: ['admin', 'funcionario'], default: 'funcionario' }
});

FuncionarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);