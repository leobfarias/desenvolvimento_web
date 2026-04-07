const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/formulario.html'));
});

router.post('/resultado', (req, res) => {

    const { nome, email, senha } = req.body;

    console.log('Dados recebidos:', req.body);

    const fs = require('fs');
    let html = fs.readFileSync(
        path.join(__dirname, '..', 'views', 'resultado.html'),
        'utf8'
    );

    html = html
    .replace('{{nome}}', nome || '(vazio)')
    .replace('{{email}}', email || '(vazio)')
    .replace('{{senha}}', senha || '(vazio)');

    res.send(html);
});

module.exports = router;