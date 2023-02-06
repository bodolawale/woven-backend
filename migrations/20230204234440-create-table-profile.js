const profileTypeTableName = 'profile_types';
const profileTableName = 'profiles';
const profileTypes = [
  { id: 1, name: 'CLIENT' },
  { id: 2, name: 'CONTRACTOR' }
];

async function createProfileTypeTable(queryInterface, DataTypes, transaction) {
  await queryInterface.createTable(
    profileTypeTableName,
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

  await queryInterface.bulkInsert(profileTypeTableName, profileTypes, { transaction });
}

async function createProfileTable(queryInterface, DataTypes, transaction) {
  await queryInterface.createTable(
    profileTableName,
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
        allowNull: false,
        references: {
          model: profileTypeTableName,
          key: 'id'
        }
      },
      password_hash: {
        type: DataTypes.TEXT
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      await createProfileTypeTable(queryInterface, DataTypes, transaction);
      await createProfileTable(queryInterface, DataTypes, transaction);
    });
  },

  down(queryInterface) {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable(profileTableName, { transaction });
      await queryInterface.dropTable(profileTypeTableName, { transaction });
    });
  }
};
