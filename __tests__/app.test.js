const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

afterAll(() => connection.destroy());

beforeEach(() => connection.seed.run());

describe('/api', () => {
    describe('/api/topics', () => {
        describe('GET', () => {
            it('GET responds with a status of 200', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
            });
            it('GET responds with requested data', () => {
                return request(app)
                    .get('/api/topics')
                    .then((res) => {
                        expect(res.body.topics).toEqual(expect.any(Array));
                        expect(res.body.topics.length).toBe(3);
                    })
            });
            it('GET to incorrect path responds path not found', () => {
                return request(app)
                    .get('/apt').expect(404)
                    .then((res) => {
                        expect(res.body.msg).toEqual('path not found')
                    })
            })
            it('GET to /api/topics responds with 404 path not found if topics spelled incorrectly', () => {
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
            it('204: deletes articles by id & returns 204 with no content', () => {
                return request(app)
                    .del('/api/articles/1')
                    .expect(204)
            })
        });
        describe('GET', () => {
            it('200: returns status 200 & desired article by id', () => {
                return request(app)
                    .get('/api/articles/2')
                    .expect(200)
                    .then(({ body: { msg } }) => {
                        expect(msg).toBe("user not found");
                    });
            })
        })
    });
});
