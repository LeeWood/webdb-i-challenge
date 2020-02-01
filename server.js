const express = require('express');

const AccountsRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.use('/accounts', AccountsRouter);

server.get('/', (req, res) => {
  res.send('<h1>SQL and Knex Project!<h2>');
});

module.exports = server;