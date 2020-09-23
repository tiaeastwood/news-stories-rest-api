const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

afterAll(() => connection.destroy());

beforeEach(() => connection.seed.run());

describe('/api', () => {
    describe('/topics', () => {
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
    });
});
