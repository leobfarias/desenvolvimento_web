const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'formulario.html'));
});

router.post('/resultado', (req, res) => {
    const { periodo } = req.body;

    const linguagens = req.body['linguagens[]']
    ? [].concat(req.body['linguagens[]'])
    : [];

    console.log('Período:', periodo);
    console.log('Linguagens:', linguagens); 

    const itens = linguagens.length > 0
    ? linguagens.map(l => `<li>${l}</li>`).join('\n')
    : '<li><em>(nenhuma selecionada)</em></li>';

    let html = fs.readFileSync(
        path.join(__dirname, '..', 'views', 'resultado.html'),
        'utf-8'
    );

    html = html
    .replace('{{periodo}}', periodo || '(não selecionado)')
    .replace('{{linguagens}}', itens);

    res.send(html);
});

module.exports = router;