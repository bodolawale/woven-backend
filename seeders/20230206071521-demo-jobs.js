const Sequelize = require('sequelize');

const { Op } = Sequelize;

const jobs = [
  {
    id: 1,
    payment_status_id: 1, // unpaid
    contract_id: 3,
    amount: 5000,
    client_id: 1,
    contractor_id: 3
  },
  {
    id: 3,
    payment_status_id: 2, // paid
    contract_id: 3,
    amount: 4000,
    client_id: 1,
    contractor_id: 3
  },
  {
    id: 3,
    payment_status_id: 2, // paid
    contract_id: 3,
    amount: 5000,
    client_id: 2,
    contractor_id: 3
  },
  {
    id: 4,
    payment_status_id: 2, // paid
    contract_id: 3,
    amount: 3000,
    client_id: 2,
    contractor_id: 4
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
