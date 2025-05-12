const Voo = require('../models/voo');
const Passageiro = require('../models/passageiro');
const Portao = require('../models/portao');

exports.create = async (req, res) => {
  try {
    const voo = new Voo(req.body);
    await voo.save();
    res.status(201).json(voo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const voos = await Voo.find();
    res.status(200).json(voos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const voo = await Voo.findById(req.params.id);
    if (!voo) return res.status(404).json({ message: 'Voo não encontrado' });
    res.status(200).json(voo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updates = req.body;
    const voo = await Voo.findById(req.params.id);

    if (!voo) return res.status(404).json({ message: 'Voo não encontrado' });

    if (updates.status === 'concluído' && voo.portaoId) {
      await Portao.findByIdAndUpdate(voo.portaoId, { disponivel: true });
    }

    const updatedVoo = await Voo.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(updatedVoo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const voo = await Voo.findByIdAndDelete(req.params.id);
    if (!voo) return res.status(404).json({ message: 'Voo não encontrado' });
    res.status(200).json({ message: 'Voo deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.atribuirPortao = async (req, res) => {
  try {
    const { portaoId } = req.params;

    const vooAtual = await Voo.findById(req.params.id);
    if (vooAtual.portaoId) {
      await Portao.findByIdAndUpdate(vooAtual.portaoId, { disponivel: true });
    }

    const portao = await Portao.findById(portaoId);
    if (!portao.disponivel) {
      throw new Error('Portão já está ocupado');
    }

    await Portao.findByIdAndUpdate(portaoId, { disponivel: false });
    const voo = await Voo.findByIdAndUpdate(
      req.params.id,
      { portaoId },
      { new: true }
    ).populate('portaoId');

    res.json(voo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.relatorioDiario = async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    const voos = await Voo.find({
      dataHoraPartida: { $gte: hoje, $lt: amanha }
    }).populate('portaoId');

    const relatorio = await Promise.all(
      voos.map(async (voo) => {
        const passageiros = await Passageiro.find({ vooId: voo._id });
        return {
          numeroVoo: voo.numeroVoo,
          origem: voo.origem,
          destino: voo.destino,
          dataHoraPartida: voo.dataHoraPartida,
          statusVoo: voo.status,
          portao: voo.portaoId?.codigo || 'Não atribuído',
          passageiros: passageiros.map(p => ({
            nome: p.nome,
            cpf: p.cpf,
            statusCheckin: p.statusCheckin
          }))
        };
      })
    );

    res.json(relatorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
