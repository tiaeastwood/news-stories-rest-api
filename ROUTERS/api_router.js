const apiRouter = require('express').Router();
const topicsRouter = require('./topics_router.js');

apiRouter.use('/topics', topicsRouter);


module.exports = apiRouter;