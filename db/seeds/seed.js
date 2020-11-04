
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const { timestampConverter, makeRefObj, formatComments  } = require('../utils/data-manipulation.js')


exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicData)
        .returning('*')
    }).then(()=> {
      return knex('users')
        .insert(userData)
        .returning('*')
    }).then(() => {
      return knex('articles')
      .insert(timestampConverter(articleData))
      .returning('*')
    }).then((articles) => {
      const objRef = makeRefObj(articles, 'title', 'article_id');
      const formattedComments = formatComments(commentData, objRef);
      return knex('comments')
      .insert(timestampConverter(formattedComments))
      .returning('*')
  })
};
