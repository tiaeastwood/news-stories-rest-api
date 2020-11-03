const usersRouter = require('express').Router();
const { getUserByUsername, getAllUsers } = require('../controllers/users.controllers');

usersRouter.get('/', getAllUsers)
usersRouter.get('/:username', getUserByUsername);


module.exports = usersRouter;