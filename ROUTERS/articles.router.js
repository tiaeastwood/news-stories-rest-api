const articlesRouter = require('express').Router();
const { deleteArticleById, getArticleById } = require('../CONTROLLERS/articles.controllers');

articlesRouter.delete('/:article_id', deleteArticleById);
articlesRouter.get('/:article_id', getArticleById)

module.exports = articlesRouter;