const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Appointment, Time } = require('../models');

router.get('/appointment', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('view-name', { Appointment });
  });

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
      .then(dbAppointmentData => {
        const appointment = dbAppointmentData.map(post => post.get({ plain: true })); 
        console.log(appointment)
        res.render('appointment', {
          appointment,
          logggedIn: req.session.loggedIn || false
        });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });


  


module.exports = router;