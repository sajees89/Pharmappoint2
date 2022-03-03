const router = require('express').Router();
const { Appointment, Time, User } = require('../../models');

router.get('/', (req, res) => {
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
        loggedIn: true,
        user_id,
        firstname: userSomething.firstname,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;