const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

afterAll(()=>connection.destroy());

describe('/api', ()=> {
    describe('/topics', ()=> {
        it('GET responds with a statys of 200', ()=> {
            return request(app)
            .get('/api/topics')
            .expect(200)
        });
    })
})