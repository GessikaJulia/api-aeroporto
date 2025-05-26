const Funcionario = require('../models/funcionario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastrar = async (req, res) => {
  const { nome, email, senha, cargo } = req.body;
  try {
    const funcionarioExistente = await Funcionario.findOne({ email });
    if (funcionarioExistente) return res.status(400).json({ message: 'Email já cadastrado' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const funcionario = new Funcionario({ nome, email, senha: senhaCriptografada, cargo });
    await funcionario.save();
    res.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const funcionario = await Funcionario.findOne({ email });
    if (!funcionario) return res.status(400).json({ message: 'Credenciais inválidas' });

    const senhaValida = await bcrypt.compare(senha, funcionario.senha);
    if (!senhaValida) return res.status(400).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: funcionario._id, nome: funcionario.nome, cargo: funcionario.cargo },
      process.env.JWT_SECRET,
      { expiresIn: '2m' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
