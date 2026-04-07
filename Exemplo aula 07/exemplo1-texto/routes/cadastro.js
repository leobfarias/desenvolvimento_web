// ─────────────────────────────────────────────
//  routes/cadastro.js  —  camada de rotas
//  Responsabilidade: receber a requisição,
//  chamar a lógica necessária e escolher a view.
// ─────────────────────────────────────────────
const express = require('express');
const path    = require('path');
const router  = express.Router();

// GET /  →  exibe o formulário
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'formulario.html'));
});

// POST /resultado  →  recebe os dados e exibe o resultado
router.post('/resultado', (req, res) => {
  // req.body contém os campos do formulário
  // A chave é o atributo "name" de cada input
  const { nome, email, senha } = req.body;

  console.log('Dados recebidos:', req.body); // útil para depuração

  // Monta a resposta usando a view de resultado
  // Substituímos os marcadores {{...}} pelo valor real
  const fs = require('fs');
  let html = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'resultado.html'),
    'utf-8'
  );

  html = html
    .replace('{{nome}}',  nome  || '(vazio)')
    .replace('{{email}}', email || '(vazio)')
    // ⚠️  Exibimos a senha apenas para fins didáticos — nunca faça isso em produção!
    .replace('{{senha}}', senha || '(vazio)');

  res.send(html);
});

module.exports = router;
