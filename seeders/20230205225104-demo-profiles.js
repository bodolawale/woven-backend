const Sequelize = require('sequelize');

const { Op } = Sequelize;

const clients = [
  {
    id: 1,
    first_name: 'Client',
    last_name: 'Jack',
    email: 'client@jack.com',
    profile_type_id: 1,
    balance: 1000
  },
  {
    id: 2,
    first_name: 'Client',
    last_name: 'Bond',
    email: 'client@bond.com',
    profile_type_id: 1,
    balance: 1000
  }
];
const contractors = [
  {
    id: 3,
    first_name: 'Contractor',
    last_name: 'James',
    email: 'contractor@james.com',
    profile_type_id: 2,
    balance: 0
  },
  {
    id: 4,
    first_name: 'Contractor',
    last_name: 'Bob',
    email: 'contractor@bob.com',
    profile_type_id: 2,
    balance: 0
  }
];
module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.bulkInsert('profiles', [...clients, ...contractors]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('profiles', { id: { [Op.between]: [1, 4] } });
  }
};
