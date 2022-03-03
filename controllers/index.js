const router = require('express').Router();
const apiRoutes = require('./api');
const viewRoutes = require('./view'); 



router.use('/api', apiRoutes);
router.use('/view', viewRoutes);

// const loginRoute = require('./api/login-route');
// const appointmentRoute = require('./api/appointment-route');
// const userRoute = require('./api/user-route');

// router.use('/user', userRoute);
// router.use('/login', loginRoute);
// router.use('/appointment', appointmentRoute);



router.use('/', (req, res) => {
  res.render('index', {
    loggedIn: req.session.loggedIn
  });
});



module.exports = router;