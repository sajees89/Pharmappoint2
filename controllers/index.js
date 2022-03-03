const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// const loginRoute = require('./api/login-route');
// const appointmentRoute = require('./api/appointment-route');
// const userRoute = require('./api/user-route');

// router.use('/user', userRoute);
// router.use('/login', loginRoute);
// router.use('/appointment', appointmentRoute);



router.use('/', (req, res) => {
  res.render('index');
});



module.exports = router;