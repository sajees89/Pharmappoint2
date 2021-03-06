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

router.get('/homepage', (req, res) => {
    const { user_id } = req.session;
    try {
      console.log(req.session.user_id);
      let appointments = user_id
        ? Appointment.findAll({
            where: {
              user_id: req.session.user_id,
            },
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
          }).then(appointments =>
            appointments.map(appointment => appointment.get({ plain: true }))
          )
        : null;
        
      const userSomething = User.findOne({
        where: {
          id: user_id,
        }
      })
      console.log(userSomething.firstname);
      res.render('homepage', {
        appointments,
        loggedIn: req.session.loggedIn,
        user_id,
        firstname: userSomething.firstname,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
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
          loggedIn: req.session.loggedIn
        });
      })
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
      const appointment = dbAppointmentData.map(post => post.get({ plain: true })); 
      console.log(appointment)
      res.render('appointment', {
        appointment,
        loggedIn: req.session.loggedIn
      });
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
  .then(dbAppointmentData => {
    const appointment = dbAppointmentData.map(post => post.get({ plain: true })); 
    console.log(appointment)
    res.render('appointment', {
      appointment,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});



module.exports = router;