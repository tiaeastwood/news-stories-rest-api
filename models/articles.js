const connection = require('../db/connection');
const { checkExists } = require('./utils');

exports.selectArticles = async ({ sort_by, order, author, topic }) => {
  const articles = await connection
    .select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .orderBy(sort_by || 'created_at', order || 'desc')
    .modify(query => {
      if (author) query.where({ 'articles.author': author });
      if (topic) query.where({ 'articles.topic': topic });
    })
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id');

  if (!articles.length) {
    await Promise.all([
      checkExists('users', 'username', author),
      checkExists('topics', 'slug', topic),
    ]);
  }
  return articles;
};

exports.selectArticleById = async article_id => {
  const article = await connection
    .select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .where({ 'articles.article_id': article_id })
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .first();
  if (!article) {
    return Promise.reject({ status: 404, msg: 'article_id not found' });
  }
  return article;
};

exports.updateArticleById = async (article_id, { inc_votes }) => {
  const [article] = await connection('articles')
    .where({ article_id })
    .increment('votes', inc_votes || 0)
    .returning('*');
  return article;
};
