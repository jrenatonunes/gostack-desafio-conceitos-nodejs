const express = require("express");
const cors = require("cors");
const {v4} = require("uuid");

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
    return response.status(400).json( { error: 'Bad request: title not provider'});
  }

  // Verifica se o repositorio já está cadatsrado, utilizando a url para comparação
  const indexRepository = repositories.findIndex(repository => repository.url === url);

  if ( indexRepository > -1 ) {
    return response.status(400).json({error: 'Repository altready exists'});
  }

  const repository = { id: v4(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
