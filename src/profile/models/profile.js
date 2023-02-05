module.exports = function (sequelize, DataTypes) {
  const Profile = sequelize.define(
    'profile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      profile_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      password_hash: {
        type: DataTypes.TEXT
      }
    },
    {
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  Profile.associate = models => {
    models.profile.belongsTo(models.profile_type, {
      foreignKey: 'profile_type_id',
      as: 'profile_type'
    });
  };

  return Profile;
};
