
exports.up = function(knex) {
    console.log('creating USERS table')
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.text('username').notNullable().primary();
        usersTable.text('avatar_url').notNullable();
        usersTable.text('name').notNullable();
    })
};

exports.down = function (knex) {
    console.log('dropping USERS table')
    return knex.schema.dropTable('users');
};
