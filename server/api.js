const express = require('express');
const apiRouter = express.Router();

// imports the minionsRouter
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');

// declares that the minions router will be used/nested for all /minions endpoints.
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
