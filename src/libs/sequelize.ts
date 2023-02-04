import { Sequelize } from 'sequelize';

const dbUrl = process.env.SQL_DB_URL ?? '';

const isSequelizeLoggingEnabled = !!process.env.SQL_DB_LOG ? console.log : false;
const isSSLEnabled = !!process.env.DB_ENABLE_SSL;

const sequelize = new Sequelize(dbUrl, {
  logging: isSequelizeLoggingEnabled,
  dialectOptions: {
    ssl: isSSLEnabled && {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('SQL database started successfully');
  })
  .catch(err => {
    console.error(err);
  });

const db = {
  sequelize,
  Sequelize
};

export default db;
