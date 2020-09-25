const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

afterAll(() => connection.destroy());

beforeEach(() => connection.seed.run());

describe('/api', () => {
    describe('/api/topics', () => {
        describe('GET', () => {
            it('200: responds with a status of 200', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
            });
            it('200: responds with requested data', () => {
                return request(app)
                    .get('/api/topics')
                    .then((res) => {
                        expect(res.body.topics).toEqual(expect.any(Array));
                        expect(res.body.topics.length).toBe(3);
                    })
            });
            it('404: to incorrect path responds path not found', () => {
                return request(app)
                    .get('/apt').expect(404)
                    .then((res) => {
                        expect(res.body.msg).toEqual('path not found')
                    })
            })
            it('404: responds with 404 path not found if topics spelled incorrectly', () => {
                return request(app)
                    .get('/api/tropics').expect(404)
                    .then((res) => {
                        expect(res.body.msg).toEqual('path not found')
                    })
            })
        })
    });
    describe('/api/users/:username', () => {
        describe('GET', () => {
            it('200: responds with a status of 200 & requested user object', () => {
                return request(app)
                    .get('/api/users/butter_bridge')
                    .expect(200)
                    .then((res) => {
                        expect(res.body.user).toEqual(
                            {
                                username: 'butter_bridge',
                                name: 'jonny',
                                avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                            },
                        );
                    });
            });
            it('404: incorrect path responds with status 404 path not found', () => {
                return request(app)
                    .get('/api/losers/butter_bridge')
                    .expect(404)
                    .then(({ body: { msg } }) => {
                        expect(msg).toBe("path not found");
                    });
            })
            it('404: username could be valid does not exist', () => {
                return request(app)
                    .get('/api/users/codebob_codepants')
                    .expect(404)
                    .then(({ body: { msg } }) => {
                        expect(msg).toBe("user not found");
                    });
            })
        });
    });
    describe('/api/articles/:article_id', () => {
        describe('DELETE', () => {
            it('204: deletes article by id & returns 204. Trying to GET deleted article will result in 404', () => {
                return request(app)
                    .del('/api/articles/1')
                    .expect(204)
                    .then(() => {
                        return request(app)
                            .get('/api/articles/1')
                            .expect(404)
                    })
            })
        });
        describe('GET', () => {
            it('200: returns status 200 & desired article by id', () => {
                return request(app)
                    .get('/api/articles/2')
                    .expect(200)
                    .then((res) => {
                        expect(res.body.article.title).toEqual('Sony Vaio; or, The Laptop');
                    });
            })
            it('404: GET article that does not exist results in 404', () => {
                return request(app)
                    .get('/api/articles/100')
                    .expect(404)
                    .then(({ body: { msg } }) => {
                        expect(msg).toBe("article not found");
                    });
            })
            it('400: bad request - GET article with article_id that is not a number', () => {
                return request(app)
                    .get('/api/articles/banana')
                    .expect(400)
                    .then(({ body: { msg } }) => {
                        expect(msg).toBe("Bad request! article_id should be a number!");
                    });
            })
        })
        describe('PATCH', () => {
            it('202 accepted: patches an article to increment the vote number', () => {
                return request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: 5 })
                    .expect(202)
                    .then((res) => {
                        expect(res.body.article.votes).toEqual(105);
                    })
            })
        });
    });
});