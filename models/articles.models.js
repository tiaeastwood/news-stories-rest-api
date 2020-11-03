const knex = require('../db/connection');


exports.fetchAllArticles = () => {
    return knex
        .select('*')
        .from('articles')
}

exports.removeArticle = (sentArticleId) => {
    return knex
        .select('*')
        .from('articles')
        .where('articles.article_id', sentArticleId)
        .del()
}


exports.fetchArticleById = (sentArticleId) => {
    let articleNum = Number(sentArticleId)
    if (isNaN(articleNum)) {
        return Promise.reject({ status: 400, msg: 'Bad request! article_id should be a number!' })
    }

    return knex
        .select('*')
        .from('articles')
        .where('articles.article_id', articleNum)
        .then((articlesArr) => {
            if (articlesArr.length === 0) {
                return Promise.reject({ status: 404, msg: 'article not found' })
            } else {
                return articlesArr[0]
            }
        })
};


exports.updateArticleById = (sentArticleId, numVotes) => {
    let articleNum = Number(sentArticleId)
    if (isNaN(articleNum)) {
        return Promise.reject({ status: 400, msg: 'Bad request! article_id should be a number!' })
    }

    return knex
        .select('*')
        .from('articles')
        .where('articles.article_id', articleNum)
        .increment('votes', numVotes)
        .returning('*')
        .then((articlesArr) => {
            if (articlesArr.length === 0) {
                return Promise.reject({ status: 404, msg: 'article not found' })
            } else {
                return articlesArr[0]
            }
        })
}