const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  test: {
    url: process.env.SQL_DB_URL,
    dialect: 'mysql',
    seederStorage: 'sequelize'
  },
  development: {
    url: process.env.SQL_DB_URL,
    dialect: 'mysql',
    seederStorage: 'sequelize'
  },
  staging: {
    url: process.env.SQL_DB_URL,
    dialect: 'mysql',
    seederStorage: 'sequelize'
  },
  prod: {
    url: process.env.SQL_DB_URL,
    dialect: 'mysql',
    seederStorage: 'sequelize'
  }
};
