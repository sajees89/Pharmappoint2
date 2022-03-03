const seedUsers = require('./user-seeds');
const seedAppointments = require('./appointments-seeds');
const seedTime = require('./time-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedTime();
  await seedAppointments();
  process.exit(0);
};

seedAll();