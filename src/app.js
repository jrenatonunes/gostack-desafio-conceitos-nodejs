const express = require("express");
const cors = require("cors");
const {createRepository, findRepositoryById, existsRepository} = require("./utils");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});


app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  // Validação dos parametros no body
  if ( !title || !url || !techs) {
    return response.status(400).json( { error: 'Bad request!'});
  }

  const repository = createRepository(title, url, techs);
  repositories.push(repository);
  return response.status(201).json(repository);
});



app.put("/repositories/:id", (request, response) => {
  const {id } = request.params;
  const {title, url, techs, likes} = request.body;

  if ( !title && !url && !techs && !likes) {
    return response.status(400).json({error: 'Bad request!'});
  }

  
  if ( ! existsRepository(id, repositories)  ) {
    return response.status(400).json({error: 'Repository not found.'});
  }

  // Atualiza o titulo, url e/ou techs caso os mesmos sejam fornecidos
  const indexRepository = findRepositoryById(id, repositories);

  title && (repositories[indexRepository].title = title);
  url && (repositories[indexRepository].url = url);
  techs && (repositories[indexRepository].techs = techs);

  return response.status(200).json(repositories[indexRepository]);
});


app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  if ( ! existsRepository(id, repositories)) {
    return response.status(400).json({error: 'Repository not found.'})
  }

  const indexRepository = findRepositoryById(id, repositories);
  repositories.splice(indexRepository, 1);
  return response.status(204).send();
});


app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  if ( ! existsRepository(id, repositories) ) {
    return response.status(400).json({error: 'Repository not found.'});
  }

  const indexRepository = findRepositoryById(id, repositories);
  repositories[indexRepository].likes++;
  return response.status(200).json(repositories[indexRepository]);
});

module.exports = app;
