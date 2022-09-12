const express = require('express');
const app = require('../server');
const apiRouter = express.Router();

// imports the minionsRouter
const minionsRouter = require('./minions');

// declares that the minions router will be used/nested for all /minions endpoints.
apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;
