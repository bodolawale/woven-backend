const contractStatusTableName = 'contract_statuses';
const contractTableName = 'contract';
const contractStatuses = [
  { id: 1, name: 'NEW' },
  { id: 2, name: 'PROGRESS' },
  { id: 3, name: 'TERMINATED' }
];

async function createContractStatuses(queryInterface, DataTypes, transaction) {
  await queryInterface.createTable(
    contractStatusTableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    { transaction }
  );

  await queryInterface.bulkInsert(contractStatusTableName, contractStatuses, { transaction });
}

async function createContractTable(queryInterface, DataTypes, transaction) {
  await queryInterface.createTable(
    contractTableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // new contract
        allowNull: false,
        references: {
          model: 'contract_statuses',
          key: 'id'
        }
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'profiles',
          key: 'id'
        }
      },
      contractor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'profiles',
          key: 'id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    { transaction }
  );
}

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async transaction => {
      await createContractStatuses(queryInterface, DataTypes, transaction);
      await createContractTable(queryInterface, DataTypes, transaction);
    });
  },

  down(queryInterface) {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable(contractTableName, { transaction });
      await queryInterface.dropTable(contractStatusTableName, { transaction });
    });
  }
};
