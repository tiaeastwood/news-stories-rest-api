const { fetchUserByUsername } = require('../MODELS/users.models');

exports.getUserByUsername = (req, res, next) => {
    let { username } = req.params;
    fetchUserByUsername(username).then((user) => {
        res.status(200).send({ user });
    }).catch(next);
};


