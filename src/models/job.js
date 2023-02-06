const { PAYMENT_STATUS } = require('../job/consts');

module.exports = function (sequelize, DataTypes) {
  const Job = sequelize.define(
    'job',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payment_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: PAYMENT_STATUS.UNPAID
      },
      contract_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      contractor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  Job.associate = models => {
    models.job.belongsTo(models.payment_status, {
      foreignKey: 'payment_status_id',
      as: 'payment_status'
    });
    models.job.belongsTo(models.contract, {
      foreignKey: 'contract_id',
      as: 'contract'
    });
    models.job.belongsTo(models.profile, {
      foreignKey: 'client_id',
      as: 'client'
    });
    models.job.belongsTo(models.profile, {
      foreignKey: 'contractor_id',
      as: 'contractor'
    });
  };

  return Job;
};
