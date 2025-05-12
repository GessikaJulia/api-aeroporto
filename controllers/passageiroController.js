const Passageiro = require('../models/passageiro');
const Voo = require('../models/voo');


function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) {
    return false;
  }
  return true;
}

exports.create = async (req, res) => {
  const { nome, cpf, vooId } = req.body;
  try {
    if (!validarCPF(cpf)) {
      return res.status(400).json({ message: 'CPF inválido' });
    }
    
    const passageiro = new Passageiro({ nome, cpf, vooId, statusCheckin: 'pendente' });
    await passageiro.save();
    return res.status(201).json(passageiro);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.checkin = async (req, res) => {
  const { id } = req.params;
  try {
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) return res.status(404).json({ message: 'Passageiro não encontrado' });
    if (passageiro.statusCheckin === 'realizado') {
      return res.status(400).json({ message: 'Check-in já realizado' });
    }
    const voo = await Voo.findById(passageiro.vooId);
    if (!voo || voo.status !== 'embarque') {
      return res.status(400).json({ message: 'Check-in só permitido durante embarque' });
    }
    passageiro.statusCheckin = 'realizado';
    await passageiro.save();
    return res.status(200).json(passageiro);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const passageiro = await Passageiro.findByIdAndUpdate(id, updates, { new: true });
    if (!passageiro) return res.status(404).json({ message: 'Passageiro não encontrado' });
    return res.status(200).json(passageiro);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const passageiros = await Passageiro.find();
    return res.status(200).json(passageiros);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) return res.status(404).json({ message: 'Passageiro não encontrado' });
    return res.status(200).json(passageiro);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const passageiro = await Passageiro.findByIdAndDelete(id);
    if (!passageiro) return res.status(404).json({ message: 'Passageiro não encontrado' });
    return res.status(200).json({ message: 'Passageiro deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};