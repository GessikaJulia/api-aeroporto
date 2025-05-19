const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const passageiroRoutes = require('./routes/passageiro');
const vooRoutes = require('./routes/voo');
const portaoRoutes = require('./routes/portao');

app.use('/passageiros', passageiroRoutes);
app.use('/voos', vooRoutes);
app.use('/portoes', portaoRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado');
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
}).catch(err => console.error('Erro ao conectar ao MongoDB:', err));


//- permite criar dois voos com o mesmo numero
//- encerrou o voo e o portao não ficou disponivel 