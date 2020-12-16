# News Stories API

News article API containing articles, topics, comments and users data.
This project uses psql to create a database that is seeded using queries via knex.
I have set up API endpoints so that the data can be accessed by my [frontend application](https://github.com/tiaeastwood/seddit).

## Tech
- SQL Postgress (pg)
- Express
- Knex - for seeding and migrations to database
- Mocha and Chai for testing endpoints and utils
- Nodemon - to run on port 
- Insomnia Core - to test the API endpoints are working and returning the correct data

## Setting up a database:
I created a file named **setup.sql** which will create my database when the command **npm run setup-dbs** is run It will drop the databaseif it already exists, so it can be created again as fresh:
```
DROP DATABASE IF EXISTS nc_news_test;
DROP DATABASE IF EXISTS nc_news;

CREATE DATABASE nc_news_test;
CREATE DATABASE nc_news;

```

## Creating Schemas
Tables and their columns are created via the files in the migrations folder, using the command **knex.schema.createTable**. Here I set what data type to expect in the columns, and set a primary key. For example:
```
exports.up = function(knex) {
  return knex.schema.createTable('topics', (topicsTable) => {
      topicsTable.text('slug').notNullable().primary(); 
      topicsTable.text('description').notNullable();
  })
};

```


## Frontend
- 🎨[Link to the frontend code repository, built with React](https://github.com/tiaeastwood/seddit)

---

# API Endpoints

- [My API is hosted on Heroku](https://seddit-news-api.herokuapp.com/)

## GET /api/topics
Example response 
```
   {
              topics: [
                {
                  slug: String,
                  description: String,
                }
              ]
            }
```

## GET /api/articles
Accepted Queries:
- sort_by (defaults to created_at)
- order (defaults to desc)
- author
- topic

Example response:
```
            {
              articles: [
                {
                  article_id: Number,
                  title: String,
                  body: String,
                  topic: String,
                  author: String,
                  votes: Number,
                  created_at: String,
                  comment_count: String
                }
              ]
            }
```

## GET /api/articles/:article_id
Example response:
```
            {
              article: {
                article_id: Number,
                title: String,
                body: String,
                topic: String,
                author: String,
                votes: Number,
                created_at: String,
                comment_count: String
              }
            }
```

## PATCH /api/articles/:article_id
Example request: 
```
{ inc_votes: 1 }
```
Example response:
```
            {
              article: {
                article_id: Number,
                title: String,
                body: String,
                topic: String,
                author: String,
                votes: Number,
                created_at: String,
                comment_count: String
              }
            }
```
## GET /api/articles/:article_id/comments
Accepted queries
- sort_by (defaults to created_at)
- order (defaults to desc)

Example response:
```
            {
              comments: [
              {
                comment_id: Number,
                  body: String,
                  article_id: Number,
                  author: String,
                  votes: Number,
                  created_at: String
                }
              ]
            }
```

## POST /api/articles/:article_id/comments
Example request:
```
            {
              body: String,
              username: String
            }
```
Example response:
```
            {
              comment: {
                comment_id: Number,
                body: String,
                article_id: Number,
                author: String,
                votes: Number,
                created_at: String
              }
            }
```

## PATCH /api/comments/:comment_id
Example request:
```
{ inc_votes: 1 }
```
Example response:
```
            {
              comment: {
                comment_id: Number,
                body: String,
                article_id: Number,
                author: String,
                votes: Number,
                created_at: String
              }
            }
```

## DELETE /api/comments/:comment_id
Example response:
```
{}
```

## GET /api/users
Example response:
```
           {
            users: [               
              {
                username: String,
                name: String,
                avatar_url: String
              }
            ]           
           }
```

## GET /api/users/:username
Example response:
```
            {
              user: {
                username: String,
                name: String,
                avatar_url: String
              }
            }
```



