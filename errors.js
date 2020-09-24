exports.handleInvalidPath = (req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
};


exports.handleCustoms = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err);
    }
}

exports.handle500s = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'uh oh, internal server error' })
}