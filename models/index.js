const User = require('./User');
const Appointment = require('./Appointment');
const Time = require('./Time');

Appointment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

User.hasMany(Appointment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Time.hasMany(Appointment, {
  foreignKey: 'Appointments_time',
  // onDelete: 'SET NULL',
});
Appointment.belongsTo(Time, {
  foreignKey: 'Appointments_time',
  // onDelete: 'SET NULL',
});

module.exports = { User, Appointment, Time };