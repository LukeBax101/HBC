const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'abcde12345',
    database : 'postgres',
    charset  : 'utf8'
  }
});
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-uuid'));

module.exports = bookshelf;
