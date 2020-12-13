const {
  selectArticles,
  selectArticleById,
  updateArticleById,
} = require('../models/articles');
const { checkOrderQuery } = require('./utils');

exports.getArticles = async (req, res) => {
  const { order } = req.query;
  if (!checkOrderQuery(order)) {
    return Promise.reject({
      status: 400,
      msg: 'Bad Request: Invalid order query',
    });
  }
  const articles = await selectArticles(req.query);
  res.send({ articles });
};

exports.getArticleById = async (req, res) => {
  const { article_id } = req.params;
  const article = await selectArticleById(article_id);
  res.send({ article });
};

exports.patchArticleById = async (req, res) => {
  const { article_id } = req.params;
  const article = await updateArticleById(article_id, req.body);
  res.send({ article });
};
