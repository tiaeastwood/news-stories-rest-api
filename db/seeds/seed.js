const { topicData, userData, articleData, commentData } = require('../data');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('../../utils');

exports.seed = async knex => {
  await knex.migrate.rollback();
  await knex.migrate.latest();

  const topicsPromise = knex('topics').insert(topicData, '*');
  const usersPromise = knex('users').insert(userData, '*');
  await Promise.all([topicsPromise, usersPromise]);

  const formattedArticleData = articleData.map(convertTimestampToDate);
  console.log(formattedArticleData)
  const articleRows = await knex('articles').insert(formattedArticleData, '*');

  const articleIdLookup = createRef(articleRows, 'title', 'article_id');
  const formattedCommentData = formatComments(commentData, articleIdLookup);
  return knex('comments').insert(formattedCommentData);
};
