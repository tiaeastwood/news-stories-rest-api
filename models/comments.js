const connection = require('../db/connection');
const { checkExists } = require('./utils');

exports.selectComments = async ({ article_id, sort_by, order }) => {
  const comments = await connection
    .select()
    .from('comments')
    .where({ article_id })
    .orderBy(sort_by || 'created_at', order || 'desc');
  if (!comments.length) {
    await checkExists('articles', 'article_id', article_id);
  }
  return comments;
};

exports.insertComment = async commentToAdd => {
  const [comment] = await connection('comments').insert(commentToAdd, '*');
  return comment;
};

exports.updateCommentById = async (comment_id, { inc_votes }) => {
  const [comment] = await connection('comments')
    .where({ comment_id })
    .increment('votes', inc_votes || 0)
    .returning('*');
  if (!comment) {
    return Promise.reject({ status: 404, msg: 'comment not found' });
  }
  return comment;
};

exports.removeCommentById = async comment_id => {
  const numberOfDeletions = await connection
    .delete()
    .from('comments')
    .where({ comment_id });
  if (!numberOfDeletions) {
    return Promise.reject({ status: 404, msg: 'comment not found' });
  }
};
