const ENV = process.env.NODE_ENV || 'development' ;
const { DB_URL } = process.env;
const test = require('./test-data');
const development = require('./development-data');

// const data = {test, development};
const data = { test, development, production: development };

module.exports =  data[ENV];
