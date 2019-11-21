const express = require('express');

const server = express();

server.use(express.json());

//"prettier.singleQuote" : true

let qtdReq = 0;
const projects = [];

// Middleware para mostrar quantidade de requisições
function logRequests(req, res, next) {
  console.log(`Quantidade de requisições: ${++qtdReq}`)

  next();
}

server.use(logRequests);

// Middleware para verificar se o projeto existe
function checkProjectInArray(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  return next();
}

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
server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(projects);
});

// Excluir projeto
server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
})

// Incluir tarefas
server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(projects);
})

server.listen(3000);
