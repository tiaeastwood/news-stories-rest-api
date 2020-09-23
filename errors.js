exports.handleInvalidPath = (req, res, next) => {
    res.status(404).send({ msg: 'path not found' });
};

// exports.handle400s = (err, req, res, next) => {
//     if (err.code === '42703') {
//         res.status(400).send({ msg: 'bad request' });
//     } else {
//         next(err);
//     }
// }

exports.handle500s = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'server error' });
}