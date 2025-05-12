const mongoose = require('mongoose');

const PortaoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  disponivel: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Portao', PortaoSchema);
