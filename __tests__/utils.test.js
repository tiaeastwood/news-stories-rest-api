// created_at: 1492163783248
process.env.NODE_ENV = 'test';
const { connection } = require('pg');
const request = require('supertest');
const { timestampConverter, renameKey, makeRefObj } = require('../db/utils/data-manipulation')
// const connection = require('connection path') for later
// const app = require(app path) for later
// afterAll(()=>connection.destroy());


describe('timeStampConverter', () => {
    it('returns a new object', () => {
        const arr  = [];
        expect(timestampConverter(arr)).not.toBe(arr);
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
      }];

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

describe('renameKey', () => {
  test('key is changed from created_by to author', () => {
    const newKey = 'author'
    const oldKey = 'created_by'
  
    const input = [
      { created_by: 'tickle122'},
      { created_by: 'grumpy19' }
    ];
    
    const output = [
      { author: 'tickle122' },
      { author: 'grumpy19' }
    ];
    expect(renameKey(newKey, oldKey, input)).toEqual(output)
    expect(renameKey(newKey, oldKey, input)).not.toEqual(input);
  })
})

describe('makeRefObj', () => {
    it('returns an object', () => {
      const input = [{},{}];
      const key1 = 'key1';
      const key2 = 'key2'
      expect(makeRefObj(input, key1, key2)).not.toBe(input);
    });
  it('returns an object that contains selected key value pairs for an array of length 1', () => {

    const articles = [{ article_id: 1, title: 'funny article name' }];

    const expectedRefObj = { 'funny article name': 1 };

    expect(makeRefObj(articles, 'title', 'article_id')).toEqual(expectedRefObj);
  });
});


