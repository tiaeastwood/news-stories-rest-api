const usersRouter = require('express').Router();
const { getUsers } = require('../CONTROLLERS/users.controllers');

usersRouter.get('/:username', getUsers);


module.exports = usersRouter;