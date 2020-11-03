const { removeArticle, fetchArticleById, updateArticleById, fetchAllArticles } = require('../models/articles.models');



exports.getAllArticles = (req, res, next) => {
    fetchAllArticles().then((articles) => {
        res.status(200).send({ articles });
    }).catch(next)
};


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
 
exports.patchArticleById = (req, res, next) => {
    let { article_id } = req.params;
    let { inc_votes } = req.body;
    updateArticleById(article_id, inc_votes).then((article) => {
        console.log('article in controller', article)
        res.status(202).send({ article })
    }).catch(next)
}