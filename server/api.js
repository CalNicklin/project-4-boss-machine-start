const express = require('express');
const apiRouter = express.Router();

// imports the minionsRouter
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');

// declares that the minions router will be used/nested for all /minions endpoints.
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
