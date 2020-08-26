const {uuid} = require("uuidv4");

const createRepository = (title, url, techs ) => {
    const repository =  {id: uuid(), title, url, techs, likes: 0};
    return repository;
}

const findRepositoryById = (id, repositories) => {
    const indexRepository = repositories.findIndex(repository => repository.id == id );
    return indexRepository;
}


const existsRepository = (id, repositories) => {
    if ( findRepositoryById(id, repositories) < 0 ) return false;
    return true;
}


module.exports = { 
    createRepository,
    findRepositoryById,
    existsRepository 
};
