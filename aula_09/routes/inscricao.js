const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Q7 - calcula há quanto tempo a dívida existe
function calcularTempo(dataInicio) {
  const inicio = new Date(dataInicio);
  const hoje = new Date();

  // se a data for futura, retorna mensagem adequada
  if (inicio > hoje) {
    return 'data futura — dívida ainda não iniciada';
  }

  const anos = hoje.getFullYear() - inicio.getFullYear();
  const meses = hoje.getMonth() - inicio.getMonth();
  const totalMeses = anos * 12 + meses;

  if (totalMeses < 1) {
    return 'menos de 1 mês';
  } else if (totalMeses < 12) {
    return totalMeses + ' mês(es)';
  } else {
    const anosCompletos = Math.floor(totalMeses / 12);
    const mesesRestantes = totalMeses % 12;
    if (mesesRestantes === 0) {
      return anosCompletos + ' ano(s)';
    }
    return anosCompletos + ' ano(s) e ' + mesesRestantes + ' mês(es)';
  }
}

// Q8 - classifica a situação da dívida
function classificarDivida(dataInicio) {
  const inicio = new Date(dataInicio);
  const hoje = new Date();

  // se a data for futura, retorna mensagem adequada
  if (inicio > hoje) {
    return 'Não iniciada';
  }

  const totalMeses = (hoje.getFullYear() - inicio.getFullYear()) * 12
                   + (hoje.getMonth() - inicio.getMonth());

  if (totalMeses < 6) {
    return 'Recente';
  } else if (totalMeses < 24) {
    return 'Intermediária';
  } else {
    return 'Antiga';
  }
}

// ─────────────────────────────────────────
// GET: exibe o formulário
// ─────────────────────────────────────────
router.get('/', (req, res) => {
  // Q11 - trata erro ao carregar arquivo HTML
  const arquivo = path.join(__dirname, '..', 'views', 'formulario.html');
  res.sendFile(arquivo, (err) => {
    if (err) {
      res.status(500).send('<p>Erro ao carregar o formulário. Tente novamente.</p>');
    }
  });
});

// ─────────────────────────────────────────
// POST: recebe os dados e exibe a confirmação
// ─────────────────────────────────────────
router.post('/confirmacao', (req, res) => {

  // Q9 - trata campos ausentes, nulos ou indefinidos
  const nome  = req.body.nome  || '';
  const email = req.body.email || '';
  const valor = req.body.valor || '';
  const data  = req.body.data  || '';

  console.log('Dados recebidos:', req.body);

  // Q6 - validação: nome obrigatório
  if (nome.trim() === '') {
    return res.send('<p>Erro: nome completo é obrigatório. <a href="/">← Voltar</a></p>');
  }

  // Q6 - validação: e-mail obrigatório e formato válido
  if (email === '' || !email.includes('@')) {
    return res.send('<p>Erro: e-mail inválido ou não informado. <a href="/">← Voltar</a></p>');
  }

  // Q5/Q6 - validação: valor obrigatório, numérico e maior que zero
  const valorNumerico = parseFloat(valor);
  if (valor === '' || isNaN(valorNumerico) || valorNumerico <= 0) {
    return res.send('<p>Erro: valor deve ser um número maior que zero. <a href="/">← Voltar</a></p>');
  }

  // Q6 - validação: data obrigatória
  if (data === '') {
    return res.send('<p>Erro: data de início da dívida é obrigatória. <a href="/">← Voltar</a></p>');
  }

  // Q7 - calcula o tempo da dívida
  const tempo = calcularTempo(data);

  // Q8 - classifica a situação da dívida
  const situacao = classificarDivida(data);

  // Q11 - trata erro ao carregar arquivo HTML
  let html;
  try {
    html = fs.readFileSync(
      path.join(__dirname, '..', 'views', 'confirmacao.html'),
      'utf-8'
    );
  } catch (err) {
    return res.status(500).send('<p>Erro ao carregar a página de confirmação. <a href="/">← Voltar</a></p>');
  }

  // substitui os marcadores {{...}} pelos valores reais
  html = html
    .replace('{{nome}}',    nome)
    .replace('{{email}}',   email)
    .replace('{{valor}}',   'R$ ' + valorNumerico.toFixed(2))
    .replace('{{data}}',    data)
    .replace('{{tempo}}',   tempo)
    .replace('{{situacao}}', situacao);

  res.send(html);
});

module.exports = router;