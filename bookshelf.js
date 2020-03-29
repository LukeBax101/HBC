const fs = require('fs');
const password = fs.readFileSync('./secrets/postgres-passwd', 'utf8').trim();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password,
    database : 'postgres',
    charset  : 'utf8'
  }
});
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-uuid'));

module.exports = bookshelf;
