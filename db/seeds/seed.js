
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

console.log(topicData)

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicData)
        .returning('*');
    })

};
