const usersRouter = require('express').Router();
const { getUser, getAllUsers } = require('../controllers/users');
const { withErrorHandling, methodNotAllowed } = require('../errors');

usersRouter
  .route('/:username')
  .get(withErrorHandling(getUser))
  .all(methodNotAllowed);

  usersRouter
  .route('/')
  .get(withErrorHandling(getAllUsers))
  .all(methodNotAllowed);


module.exports = usersRouter;
