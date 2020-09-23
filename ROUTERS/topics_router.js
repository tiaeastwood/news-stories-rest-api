const topicsRouter = require('express').Router();
const { getTopics } = require('../CONTROLLERS/topics_controller');

topicsRouter.get('/', getTopics);


module.exports = topicsRouter;