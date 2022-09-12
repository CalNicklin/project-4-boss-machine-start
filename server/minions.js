const minionsRouter = require('express').Router();

module.exports = minionsRouter;

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


// '/' endpoint because /minions is already declared in api.js
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(getFromDatabaseById('minion', req.params));
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionsId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionToDelete = deleteFromDatabasebyId('minions', req.params.id);
    if (minionToDelete) {
        res.status(204);
    } else {
        res.status(500)
    };
    res.send(minionToDelete);
});
