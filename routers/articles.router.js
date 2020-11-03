const articlesRouter = require('express').Router();
const { deleteArticleById, getArticleById, patchArticleById } = require('../CONTROLLERS/articles.controllers');

articlesRouter.delete('/:article_id', deleteArticleById);
articlesRouter.get('/:article_id', getArticleById)
articlesRouter.patch('/:article_id', patchArticleById)

module.exports = articlesRouter;