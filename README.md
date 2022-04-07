# News Stories API

News article API containing articles, topics, comments and users data.
This project uses psql to create a database that is seeded using queries via knex.

## Tech
- SQL Postgres (pg)
- Express
- Knex - for seeding and migrations to database
- Mocha and Chai for testing endpoints and utils
- Nodemon - to run on port 

---

## Running the application

### 1. Clone Repository
```
git clone https://github.com/tiaeastwood/news-stories-rest-api.git
```
### 2. Install dependancies
```
npm i

// you also need psql configured on your machine
```
### 3. Set up the database:
```
npm run setup-db
```
### 4. Seed (add data to) the database:
```
npm run seed
```
### 5. Run the node server via nodemon
```
npm run dev
```

---
## SQL

I created a file named **setup.sql** which will create my database when the command **npm run setup-dbs** is run It will drop the database if it already exists, so it can be created again as fresh:
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


# API Endpoints

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



