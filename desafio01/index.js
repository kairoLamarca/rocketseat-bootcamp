const express = require('express');

const server = express();

server.use(express.json());

//"prettier.singleQuote" : true



const projects = [];

// Criar projeto
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects);
});

// Lista todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// Altera um projeto por id
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(projects);
});

// Excluir projeto
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
})

// Incluir tarefas
server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(projects);
})

server.listen(3000);
