const knex = require('../db/connection');

exports.removeArticle = (sentArticleId) => {
    return knex
        .select('*')
        .from('articles')
        .where('articles.article_id', sentArticleId)
        .del()
}


exports.fetchArticleById = (sentArticleId) => {
    return knex
        .select('*')
        .from('articles')
        .where('articles.article_id', sentArticleId)
        .then((articlesArr) => {
            if (articlesArr.length === 0) {
                return Promise.reject({ status: 404, msg: 'article not found' })
            } else {
                console.log(articlesArr[0])
                return articlesArr[0]
            }
        })
};