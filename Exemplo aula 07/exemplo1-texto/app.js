// ─────────────────────────────────────────────
//  app.js  —  ponto de entrada da aplicação
// ─────────────────────────────────────────────
const express = require('express');
const path    = require('path');

const cadastroRoutes = require('./routes/cadastro');

const app = express();

// ── Middleware ────────────────────────────────
// Interpreta corpos de formulários HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// Serve arquivos estáticos da pasta public/ (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Define o diretório onde ficam os arquivos .html das views
app.set('views', path.join(__dirname, 'views'));

// ── Rotas ─────────────────────────────────────
app.use('/', cadastroRoutes);

// ── Servidor ──────────────────────────────────
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
