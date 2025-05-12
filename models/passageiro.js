const mongoose = require('mongoose');
const { Schema } = mongoose;

const PassageiroSchema = new Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  vooId: { type: Schema.Types.ObjectId, ref: 'Voo' },
  statusCheckin: { type: String, enum: ['pendente', 'realizado'], default: 'pendente' }
});

module.exports = mongoose.model('Passageiro', PassageiroSchema);
