const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    firstname: 'Bell',
    lastname: 'Canada',
    email: 'bell@canada.com',
    password: 'telus'
  },
  {
    firstname: 'Roger',
    lastname: 'Ted',
    email: 'tedroger@nroger.com',
    password: 'ted123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;