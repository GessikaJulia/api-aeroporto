const Portao = require('../models/portao');

exports.create = async (req, res) => {
  try {
    const { codigo } = req.body;
    const portao = new Portao({ codigo, disponivel: true });
    await portao.save();
    res.status(201).json(portao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const portoes = await Portao.find();
    res.json(portoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDisponibilidade = async (req, res) => {
  try {
    const { disponivel } = req.body;
    const portao = await Portao.findByIdAndUpdate(
      req.params.id,
      { disponivel },
      { new: true }
    );
    res.json(portao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const portao = await Portao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!portao) return res.status(404).json({ message: 'Portão não encontrado' });
    res.status(200).json(portao);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const portoes = await Portao.find();
    res.status(200).json(portoes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const portao = await Portao.findById(req.params.id);
    if (!portao) return res.status(404).json({ message: 'Portão não encontrado' });
    res.status(200).json(portao);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const portao = await Portao.findByIdAndDelete(req.params.id);
    if (!portao) return res.status(404).json({ message: 'Portão não encontrado' });
    res.status(200).json({ message: 'Portão deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
