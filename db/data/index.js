const ENV = process.env.NODE_ENV || "development";

const data = {topicData, articleData, userData, commentData}

module.exports = data[ENV];