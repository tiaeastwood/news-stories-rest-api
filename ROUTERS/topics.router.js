const topicsRouter = require('express').Router();
const { getTopics } = require('../CONTROLLERS/topics.controllers');

topicsRouter.get('/', getTopics);


module.exports = topicsRouter;