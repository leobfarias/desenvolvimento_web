const express = require('express');
const path = require('path');

// Q12 - importa as rotas separadas em outro arquivo
const inscricaoRoutes = require('./routes/inscricao');

const app = express();

// interpreta corpos de formulários HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// serve arquivos estáticos da pasta public/ (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// define o diretório onde ficam os arquivos .html das views
app.set('views', path.join(__dirname, 'views'));

// rotas
app.use('/', inscricaoRoutes);

// Q10 - rota inexistente: qualquer URL não definida cai aqui
app.use((req, res) => {
  res.status(404).send(`
    <p>Página não encontrada.</p>
    <a href="/">← Voltar ao formulário</a>
  `);
});

// servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});