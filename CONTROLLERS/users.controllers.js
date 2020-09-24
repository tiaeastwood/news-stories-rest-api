const { fetchUsers } = require('../MODELS/users.models');


exports.getUsers = (req, res, next) => {
    let { username } = req.params;
    fetchUsers(username).then((user) => {
        res.status(200).send({ user });
    }).catch((err) => {
        next(err);
    })
};


