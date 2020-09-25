const { removeArticle, fetchArticleById } = require('../MODELS/articles.models');

exports.deleteArticleById = (req, res, next) => {
    let { article_id } = req.params;
    removeArticle(article_id).then(() => {
        res.status(204).send()
    }).catch(next)
}

exports.getArticleById = (req, res, next) => {
    let { article_id } = req.params;
    fetchArticleById(article_id).then((article) => {
        res.status(200).send({ article })
    }).catch(next)
}