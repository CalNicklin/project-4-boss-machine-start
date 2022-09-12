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


const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// checkMillionDollarIdea middleware
// 1) is a function takes three arguments
// 2) sends a 400 error if the total yield is less than one million dollars
// 3) calls next for ideas that will yield at least one million dollars
// 4) sends a 400 error if numWeeks or weeklyRevenue is not supplied
// 5) sends a 400 error if numWeeks or weeklyRevenue is an invalid string
// 6) is used in a POST /api/ideas route to reject insufficiently profitable ideas

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    };
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });

