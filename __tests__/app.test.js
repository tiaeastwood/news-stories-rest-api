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
            it('GET username responds with a status of 200 & 1 user object', () => {
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
        });
    });
});
