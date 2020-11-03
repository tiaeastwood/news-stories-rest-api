const articlesRouter = require('express').Router();
const { deleteArticleById, getArticleById, patchArticleById, getAllArticles } = require('../controllers/articles.controllers');

articlesRouter.get('/', getAllArticles);
articlesRouter.delete('/:article_id', deleteArticleById);
articlesRouter.get('/:article_id', getArticleById);
articlesRouter.patch('/:article_id', patchArticleById);

module.exports = articlesRouter;