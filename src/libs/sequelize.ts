import { Sequelize, DataTypes } from 'sequelize';
import ProfileModels from '../profile/models';
import ContractModels from '../contract/models';

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

const db: any = {};

sequelize
  .authenticate()
  .then(() => {
    console.log('SQL database started successfully');
  })
  .catch(err => {
    console.error(err);
  });

const modulesModels = [ProfileModels, ContractModels];

modulesModels.forEach(moduleModels => {
  try {
    Object.values(moduleModels).forEach((model: any) => {
      const modelInstance = model(sequelize, DataTypes);
      db[modelInstance.name] = modelInstance;
    });
  } catch (err) {
    console.error(`An error occurred while loading models`);
    console.error(err);
    throw err;
  }
});

Object.keys(db).forEach(modelName => {
  try {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  } catch (err) {
    console.error(`An error occurred while associating models. Model is ${modelName}`);
    console.error(err);
    throw err;
  }
});

sequelize.sync({ logging: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
