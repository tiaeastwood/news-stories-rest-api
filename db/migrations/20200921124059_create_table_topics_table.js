
exports.up = function(knex) {
  console.log('creating TOPICS table');
  return knex.schema.createTable('topics', (topicsTable) => {
      topicsTable.text('slug').notNullable().primary();
      topicsTable.text('description').notNullable();
  })
};

exports.down = function(knex) {
  console.log('removing TOPICS table');
  return knex.schema.dropTable('topics');
};
