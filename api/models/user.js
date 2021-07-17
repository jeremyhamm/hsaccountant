const client = require('../services/database');
const format = require('pg-format');

/**
 * Find user by email
 * @param {object} email 
 * @returns {Promise}
 */
const findUser = async (query) => {
  const sql = `
    SELECT id, email
    FROM users 
    WHERE %s = %L
  `;
  const formattedSQL = format.withArray(sql, [query.column, query.value]);
  return client
    .query(formattedSQL)
    .then(res => {
      return res.rows;
    })
    .catch(e => {
      throw new Error(e.stack);
    });
};

/**
 * Save new user
 * @param {array}
 * @return {Promise}
 */
const createUser = (details) => {
  const sql = `
    INSERT INTO users (email, first_name, last_name, photo)
    VALUES($1, $2, $3, $4)
    RETURNING id
  `;
  return client
  .query(sql, details)
  .then(res => {
    return res.rows;
  })
  .catch(e => {
    throw new Error(e.stack);
  });
};

module.exports = {
  findUser,
  createUser
}