const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'greenix_project',
  username: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

module.exports = sequelize;
