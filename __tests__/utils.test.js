
process.env.NODE_ENV = 'test';
const { timestampConverter, renameKey, makeRefObj, formatComments } = require('../db/utils/data-manipulation')


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


describe('formatComments', () => {
  it('returns new array, does not mutate original', () => {
    const commentsArr = [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    },
    {
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: 'Making sense of Redux',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209256,
    }];
    const refObj = { 'funny article name': 1 }
    expect(formatComments(commentsArr, refObj)).not.toEqual(commentsArr)
  });
  
  it('returns formatted comments', () => {

    const commentsArr = [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      created_by: 'tickle122',
      votes: -1,
      //created_at: 1468087638932,
    }];
    
    const formattedComments = [{
        body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        votes: -1,
        //created_at: 1468087638932,
        author: 'tickle122',
        article_id: 29
      }];
    
    const data = [
      {
        article_id: 29,
        title: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
        body: "n 1686, the croissant was invented in Austria. That's a fun fact I'd probably.",
        votes: 0,
        topic: 'cooking',
        author: 'tickle122',
        //created_at: 2017 - 03 - 11T13: 20: 18.000Z
      },
      {
        article_id: 30,
        title: 'Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams',
        body: "What if, for once, your Thanksgiving sides were just as dazzling as the centerpiece turkey? Imagine a world where prese",
        votes: 0,
        topic: 'cooking',
        author: 'jessjelly',
        //created_at: new Date()
        
      },
    ]

    const refObj = makeRefObj(data, 'title', 'article_id')

    expect(formatComments(commentsArr, refObj)).toEqual(formattedComments)
  })
});
