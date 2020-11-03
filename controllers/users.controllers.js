const { fetchUserByUsername, fetchAllUsers } = require('../models/users.models');

exports.getAllUsers = (req, res, next) => {
    fetchAllUsers().then((users) => {
        res.status(200).send({ users });
    }).catch(next)
};

exports.getUserByUsername = (req, res, next) => {
    let { username } = req.params;
    fetchUserByUsername(username).then((user) => {
        res.status(200).send({ user });
    }).catch(next);
};


