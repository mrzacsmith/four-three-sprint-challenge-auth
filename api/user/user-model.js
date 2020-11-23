const db = require('../../data/dbConfig');

module.exports = {
  insert,
  getById,
  getByUsername,
};

async function insert(user) {
  const [id] = await db('users').insert(user);
  return db('users').where({ id }).first();
}

function getById(id) {
  return db('users').where({ id }).first();
}

function getByUsername(username) {
  return db('users').where({ username }).first();
}
