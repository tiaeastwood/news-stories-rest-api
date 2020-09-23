const apiRouter = require('express').Router();
const topicsRouter = require('./topics_router.js');

apiRouter.use('/topics', topicsRouter);

apiRouter.use((req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
})

module.exports = apiRouter;