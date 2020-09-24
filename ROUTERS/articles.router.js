const articlesRouter = require('express').Router();
const { getArticleById } = require('../CONTROLLERS/articles.controllers');

articlesRouter.get('/:article_id', getArticleById);


module.exports = topicsRouter;