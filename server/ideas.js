const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
}
    = require('./db');


// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(getFromDatabaseById('ideas', req.params));
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaToDelete = deleteFromDatabasebyId('ideas', req.params.id);
    if (ideaToDelete) {
        res.status = 204;
    } else {
        res.status = 500;
    }
    res.send(ideaToDelete);
});

