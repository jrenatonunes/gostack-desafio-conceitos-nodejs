const express = require("express");
const cors = require("cors");
const {uuid} = require("uuidv4");

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

  // Verifica se o repositorio já está cadastrado, utilizando a url para comparação
  // const indexRepository = repositories.findIndex(repository => repository.url === url);

  // if ( indexRepository > -1 ) {
  //   return response.status(400).json({error: 'Repository altready exists'});
  // }

  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.status(201).json(repository);
});



app.put("/repositories/:id", (request, response) => {
  const {id } = request.params;
  const {title, url, techs, likes} = request.body;

  if ( !title && !url && !techs && !likes) {
    return response.status(400).json({error: 'Bad request: title, url and tecks not povide'});
  }

  const indexRepository = repositories.findIndex(repository => repository.id === id);
  if ( indexRepository < 0 ) {
    return response.status(400).json({error: 'Repository not exists'});
  }

  // Atualiza o titulo, url ou techs caso os mesmos sejam fornecidos
  title && (repositories[indexRepository].title = title);
  url && (repositories[indexRepository].url = url);
  techs && (repositories[indexRepository].techs = techs);

  return response.status(200).json(repositories[indexRepository]);
});


app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  // Verifica se o repositório existe
  const indexRepository = repositories.findIndex(repository => repository.id === id);

  if ( indexRepository < 0 ) {
    return response.status(400).json({error: 'Repository not found.'})
  }

  repositories.splice(indexRepository, 1);
  return response.status(204).send();

});



app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const indexRepository = repositories.findIndex(repository => repository.id === id);
  if ( indexRepository < 0 ) {
    return response.status(400).json({error: 'Repository not found.'});
  }

  repositories[indexRepository].likes++;

  return response.status(200).json(repositories[indexRepository]);

});

module.exports = app;
