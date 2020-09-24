const { fetchUserById } = require('../MODELS/users.models');


exports.getUserById = (req, res, next) => {
    let { username } = req.params;
    fetchUserById(username).then((user) => {
        res.status(200).send({ user });
    }).catch(next);
};


