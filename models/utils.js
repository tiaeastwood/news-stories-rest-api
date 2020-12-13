const connection = require('../db/connection');

exports.checkExists = async (table, column, query) => {
  if (!query) return true;
  const result = await connection(table)
    .select()
    .where({ [column]: query })
    .first();
  const notFound = table[0].toUpperCase() + table.slice(1, -1);
  return result
    ? true
    : Promise.reject({ status: 404, msg: `${notFound} Not Found` });
};
