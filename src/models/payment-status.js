module.exports = function (sequelize, DataTypes) {
  const PaymentStatus = sequelize.define(
    'payment_status',
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

  return PaymentStatus;
};
