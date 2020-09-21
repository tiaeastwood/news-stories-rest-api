const ENV = process.env.NODE_ENV || "development";


const data = { test: require('./test-data'), development: require('./development-data') }

//{ topicData, articleData, userData, commentData }

module.exports = data[ENV];