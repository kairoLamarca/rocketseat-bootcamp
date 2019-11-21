const express = require('express');

const server = express();

server.use(express.json());

//"prettier.singleQuote" : true

const projects = [];

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title });

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
})

server.listen(3000);
