const { selectUserByUsername, fetchAllUsers } = require('../models/users');

exports.getUser = async (req, res) => {
  const { username } = req.params;
  const user = await selectUserByUsername(username);
  res.send({ user });
};

exports.getAllUsers = async (req, res) => {
  const users = await fetchAllUsers();
  return res.send({ users });
};



