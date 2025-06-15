// controllers/funcionarioController.js
const Funcionario = require('../models/funcionario');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;
    const funcionario = new Funcionario({ nome, email, senha, cargo });
    await funcionario.save();
    funcionario.senha = undefined;
    return res.status(201).json(funcionario);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const funcionario = await Funcionario.findOne({ email }).select('+senha');
    
    if (!funcionario) return res.status(400).json({ message: 'Credenciais inválidas' });
    
    const senhaValida = await bcrypt.compare(senha, funcionario.senha);
    if (!senhaValida) return res.status(400).json({ message: 'Credenciais inválidas' });
    
    const token = jwt.sign(
      { id: funcionario._id, nome: funcionario.nome, cargo: funcionario.cargo },
      process.env.JWT_SECRET,
      { expiresIn: '2m' }
    );
    
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};