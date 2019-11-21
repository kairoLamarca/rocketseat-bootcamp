const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Kairo" }

server.get('/users/:id', (req, res) => {
  const nome = req.query.nome;
  const { id } = req.params;

  return res.json({ message: `Hello ${nome}, Buscando o usuário ${id}` });
});

server.listen(3000);
