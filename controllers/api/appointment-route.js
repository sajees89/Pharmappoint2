const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Appointment, Time, User } = require('../../models');

// get all appointments
router.get('/', (req, res) => {
  Appointment.findAll({

     attributes: ['Appointments_time', 'Appointments_date', 'Appointments_type'],
     include: [
        {
           model: User,
           attributes: ['email'],
        },
        {
          model: Time,
          attributes: ['time']
        },
     ],
    })
    .then(dbAppointmentData => res.json(dbAppointmentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get an appointment
router.get('/:id', (req, res) => {
  Appointment.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['Appointments_time', 'Appointments_date', 'Appointments_type'],
      include: [
        {
           model: User,
           attributes: ['email'],
        },
        {
          model: Time,
          attributes: ['time']
        },
     ],
    })
    .then(dbAppointmentData => {
      if (!dbAppointmentData) {
        res.status(404).json({ message: 'No Appointments were found' });
        return;
      }
      res.json(dbAppointmentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create an Appointment
router.post('/', (req, res) => {
  Appointment.create({
    Appointments_time: req.body.Appointments_time,
    Appointments_date: req.body.Appointments_date,
    Appointments_type: req.body.Appointments_type,
  })
  .then(dbAppointmentData => res.json(dbAppointmentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update an Appointment
router.put('/:id', (req, res) => {
  Appointment.update(
      {
        Appointments_time: req.body.Appointments_time,
        Appointments_date: req.body.Appointments_date,
        Appointments_type: req.body.Appointments_type,

      },
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then(dbAppointmentData => {
      if(!dbAppointmentData) {
          res.status(404).json({ message: 'No Appointment was found'});
          return;
  }
  res.json(dbAppointmentData);
  })  
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// Delete an Appointment
router.delete('/:id', (req, res) => {
  Appointment.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbAppointmentData => {
      if(!dbAppointmentData) {
          res.status(404).json({ message: 'No Appointment was found'});
          return;
  }
  res.json(dbAppointmentData);
  })  
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;