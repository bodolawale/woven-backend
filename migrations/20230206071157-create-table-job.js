const paymentStatusTableName = 'payment_statuses';
const jobTableName = 'jobs';
const paymentStatuses = [
  { id: 1, name: 'UNPAID' },
  { id: 2, name: 'PAID' }
];

async function createPaymentStatuses(queryInterface, DataTypes, transaction) {
  await queryInterface.createTable(
    paymentStatusTableName,
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

  await queryInterface.bulkInsert(paymentStatusTableName, paymentStatuses, { transaction });
}

async function createJobTable(queryInterface, DataTypes, transaction) {
  await queryInterface.createTable(
    jobTableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payment_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'payment_statuses',
          key: 'id'
        }
      },
      contract_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'contracts',
          key: 'id'
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: false,
        defaultValue: DataTypes.fn('NOW')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.fn('NOW')
      }
    },
    { transaction }
  );
}

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async transaction => {
      await createPaymentStatuses(queryInterface, DataTypes, transaction);
      await createJobTable(queryInterface, DataTypes, transaction);
    });
  },

  down(queryInterface) {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable(jobTableName, { transaction });
      await queryInterface.dropTable(paymentStatusTableName, { transaction });
    });
  }
};
