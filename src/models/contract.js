const { CONTRACT_STATUSES } = require('../contract/consts');

module.exports = function (sequelize, DataTypes) {
  const Contract = sequelize.define(
    'contract',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: CONTRACT_STATUSES.NEW
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

  Contract.associate = models => {
    models.contract.belongsTo(models.contract_status, {
      foreignKey: 'status_id',
      as: 'status'
    });
    models.contract.belongsTo(models.profile, {
      foreignKey: 'client_id',
      as: 'client'
    });
    models.contract.belongsTo(models.profile, {
      foreignKey: 'contractor_id',
      as: 'contractor'
    });
  };

  return Contract;
};
