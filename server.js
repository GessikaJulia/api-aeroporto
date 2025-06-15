// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Importar as rotas
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const vooRoutes = require('./routes/vooRoutes');
const portaoRoutes = require('./routes/portaoRoutes');
const passageiroRoutes = require('./routes/passageiroRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB...'))
  .catch(err => console.error('Não foi possível conectar ao MongoDB...', err));

// Usar as rotas
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/voos', vooRoutes);
app.use('/api/portoes', portaoRoutes);
app.use('/api/passageiros', passageiroRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Aeroporto no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});