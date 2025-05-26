const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

// rotas
const passageiroRoutes = require('./routes/passageiro');
const vooRoutes = require('./routes/voo');
const portaoRoutes = require('./routes/portao');
const funcionarioRoutes = require('./routes/funcionario');

const { autenticar, somenteAdmin } = require('./middlewares/auth');

// usar rotas com proteção
app.use('/funcionarios', funcionarioRoutes);
app.use('/passageiros', autenticar, passageiroRoutes);
app.use('/portoes', autenticar, portaoRoutes);
app.use('/voos', autenticar, vooRoutes);

// proteger alterações apenas para admin
const passageiro = require('./controllers/passageiroController');
const portao = require('./controllers/portaoController');
const voo = require('./controllers/vooController');

app.post('/passageiros', autenticar, passageiro.create);
app.post('/portoes', autenticar, somenteAdmin, portao.create);
app.post('/voos', autenticar, somenteAdmin, voo.create);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado');
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
}).catch(err => console.error('Erro ao conectar ao MongoDB:', err));
