const usersRouter = require('express').Router();
const { getUserByUsername } = require('../CONTROLLERS/users.controllers');


usersRouter.get('/:username', getUserByUsername);


module.exports = usersRouter;