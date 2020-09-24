const express = require('express');
const app = express();
const apiRouter = require('./ROUTERS/api.router');
const { handleInvalidPath, handleCustoms, handle500s } = require('./errors')


app.use(express.json());
app.use('/api', apiRouter);

app.all('/*', handleInvalidPath);
app.use(handleCustoms);
app.use(handle500s);


module.exports = app;
