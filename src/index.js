const express = require('express');
const { uuid } = require('uuidv4');

const projects = [];

const app = express();

app.use(express.json());

app.get('/projects', (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter((p) => p.title.includes(title))
    : projects;

  return res.json(results);
});

app.post('/projects', (req, res) => {
  const { title, owner } = req.body;
  const project = { id: uuid(), title, owner };

  projects.push(project);

  return res.json(project);
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ mesage: 'not found' });
  }

  const { title, owner } = req.body;

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ mesage: 'not found' });
  }

  projects.splice(projectIndex, 1);

  return res.status(204).json();
});

app.listen(3333, () => {
  console.log('------------------------------------');
  console.log('ok');
  console.log('------------------------------------');
});
