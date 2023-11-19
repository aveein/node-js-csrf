

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('eshop', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;