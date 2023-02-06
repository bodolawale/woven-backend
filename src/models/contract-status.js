module.exports = function (sequelize, DataTypes) {
  const ContractStatus = sequelize.define(
    'contract_status',
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
    {
      underscored: true,
      createdAt: false,
      updatedAt: false
    }
  );

  return ContractStatus;
};
