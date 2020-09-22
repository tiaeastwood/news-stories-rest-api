// created_at: 1492163783248
process.env.NODE_ENV = 'test';
const { Connection } = require('pg');
const request = require('supertest');
const { timestampConverter, addUsername } = require('../db/utils/data-manipulation')
// const connection = require('connection path') for later
// const app = require(app path) for later

// afterAll(()=>connection.destroy());

describe('timeStampConverter', () => {
    it('returns a new object', () => {
        const input  = [];
        expect(timestampConverter(input)).not.toBe(input);
    });
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
      expect(timestampConverter(input)).not.toEqual(input);
    })

})

describe.only('addUsername', () => {
  test('the input is not mutated', () => {
    const input  = [];
    expect(addUsername(input)).not.toBe(input);
  })
  test('key is changed from created_by to author', () => {
    const input = {
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    }
    const output = {
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      author: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    }
    expect(addUsername(input)).toEqual(output)
  })
})



