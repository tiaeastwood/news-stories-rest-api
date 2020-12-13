
exports.up = function(knex) {
    return knex.schema.createTable('articles', (articlesTable) => {
        articlesTable.increments('article_id').primary();
        articlesTable.text('title').notNullable();
        articlesTable.text('body').notNullable();
        articlesTable.text('image').defaultTo('https://images.unsplash.com/photo-1592301388444-185c2d047bbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
        articlesTable.integer('votes').defaultTo(0);
        articlesTable.text('topic').references('topics.slug');
        articlesTable.text('author').references('users.username');
        articlesTable.timestamp('created_at').defaultTo(knex.fn.now());
        articlesTable.text('article_img_url');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('articles');
};
