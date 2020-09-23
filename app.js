const express = require('express');
const app = express();
const apiRouter = require('./ROUTERS/api_router');


app.use(express.json());
app.use('/api', apiRouter);

module.exports = app;
