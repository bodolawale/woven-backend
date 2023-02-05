const Sequelize = require('sequelize');
const { Op } = Sequelize;

const contracts = [
  {
    id: 1,
    status_id: 1,
    client_id: 1,
    contractor_id: 3
  },
  {
    id: 2,
    status_id: 1,
    client_id: 1,
    contractor_id: 3
  },
  {
    id: 3,
    status_id: 2,
    client_id: 1,
    contractor_id: 3
  },
  {
    id: 4,
    status_id: 3,
    client_id: 1,
    contractor_id: 3
  }
];
module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.bulkInsert('contracts', contracts);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('contracts', { id: { [Op.between]: [1, 4] } });
  }
};
