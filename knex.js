const testData = require('./db/data/test-data');
const devData = require('./db/data/development-data');

const data = {devData, testData};
const ENV = process.env.NODE_ENV || 'development' ;

module.exports =  data[ENV];

