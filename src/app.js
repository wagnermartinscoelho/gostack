const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const repositorie_like = [];

//Listar repositórios
app.get('/repositories', (request, response) => {
  const { title, owner } = request.query;

  return response.json(repositories);
});

//Criar repositórios
app.post('/repositories', (request, response) => {
  const { title, owner } = request.body;

  const repositorie = { id: uuid(), title, owner };

  repositories.push(repositorie);

  return response.json(repositorie);
});

//Alterar repositórios
app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie=> repositorie.id === id);

  if (repositorieIndex < 0){
    return response.status(400).json({ error: ' Repositorie not found.' })
  }

  const repositorie = {
    id, title, owner, 
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

//Excluir repositórios
app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie=> repositorie.id === id);

  if (repositorieIndex < 0){
    return response.status(400).json({ error: ' Repositorie not found.' })
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post('/repositories/like', (request, response) => {
  const { id_repositories, like } = request.body;

  const repositorie = { id_repositories, like };

  repositorie_like.push(repositorie);

  return response.json(repositorie);
});


module.exports = app;