const { Appointment } = require('../models');

const appointmentdata = [
  {
    Appointments_time: 2,
    Appointments_date: 7,
    Appointments_type: 'COVID Test',
    user_id: 1,
  },
  {
    Appointments_time: 5,
    Appointments_date: 5,
    Appointments_type: 'COVID Shot',
    user_id: 2,
  },
  {
    Appointments_time: 6,
    Appointments_date: 2,
    Appointments_type: 'X-ray',
    user_id: 1,
  },
  {
    Appointments_time: 4,
    Appointments_date: 3,
    Appointments_type: 'COVID Test',
    user_id: 2,
  },
  {
    Appointments_time: 1,
    Appointments_date: 4,
    Appointments_type: 'Flu-Shot',
    user_id: 2,
  },
];

const seedPosts = () => Appointment.bulkCreate(appointmentdata);
module.exports = seedPosts;