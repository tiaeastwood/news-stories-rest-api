
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');


console.log(articleData)

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
      .insert(articleData)
      .returning('*')
    })

};
