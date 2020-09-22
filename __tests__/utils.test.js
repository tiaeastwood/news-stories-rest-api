// created_at: 1492163783248
process.env.NODE_ENV = 'test';
const { Connection } = require('pg');
const request = require('supertest');
const { timestampConverter } = require('../db/utils/data-manipulation')
// const connection = require('connection path') for later
// const app = require(app path) for later

// afterAll(()=>connection.destroy());

describe('timeStampConverter', () => {
    it('returns a new object', () => {
        const input  = [];
        expect(timestampConverter(input)).not.toBe(input);
    });
    // it('returns the correct date', () => {
    //     const input = 1492163783248;
    //     const output = 'Fri, 14 Apr 2017 09:56:23 GMT';
    //     expect(timestampConverter(input)).toEqual(output);
    // })
    it('returns an object with the key value updated to the correct date', () => {
        const input = [{
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body:
              'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: 1471522072389,
        },
          {
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'some gifs',
            created_at: 1289996514171,
          }
        ];
      
      const output = [{
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 'Thu, 18 Aug 2016 12:07:52 GMT',
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 'Wed, 17 Nov 2010 12:21:54 GMT',
      }
    ];
          expect(timestampConverter(input)).toEqual(output);
    })

})



