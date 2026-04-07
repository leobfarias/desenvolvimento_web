const express = require('express');
const path = require('path');

const cadastroRoutes = require('./routes/cadastro');

const app = express();
 app.use(express.urlencoded({ extended: false }));

 app.use(express.static(path.join(__dirname, 'public')));

 app.set('views', path.join(__dirname, 'views'));

 app.use('/', cadastroRoutes);

 app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
}); 