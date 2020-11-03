const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/users.controllers');


usersRouter.get('/:username', getUserByUsername);


module.exports = usersRouter;