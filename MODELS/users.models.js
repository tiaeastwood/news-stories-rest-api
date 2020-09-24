const knex = require('../db/connection');

exports.fetchUsers = (username => {

        return knex
            .select(
                "username",
                "name",
                "avatar_url"
            )
            .from("users")
            .where("users.username", username)
            .then((users) => {
                return users[0]
            })
 
});

