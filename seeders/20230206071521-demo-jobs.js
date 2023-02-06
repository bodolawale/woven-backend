const Sequelize = require('sequelize');
const { Op } = Sequelize;

const jobs = [
  {
    id: 1,
    payment_status_id: 1,
    contract_id: 3,
    amount: 500,
    client_id: 1,
    contractor_id: 3
  }
];
module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.bulkInsert('jobs', jobs);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('jobs', { id: { [Op.between]: [1, 4] } });
  }
};
