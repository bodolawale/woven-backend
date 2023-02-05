module.exports = function (sequelize, DataTypes) {
  const ProfileType = sequelize.define(
    'profile_type',
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

  return ProfileType;
};
