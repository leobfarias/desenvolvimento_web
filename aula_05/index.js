const express = require('express');
const server = express();

server.get('/usuario', (request, response) => {
    return response.json({ curso: 'CDIA' });
});

server.listen(3000);