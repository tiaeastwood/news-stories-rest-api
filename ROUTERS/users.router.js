const usersRouter = require('express').Router();
const { getUserById } = require('../CONTROLLERS/users.controllers');


usersRouter.get('/:username', getUserById);


module.exports = usersRouter;