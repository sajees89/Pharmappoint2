const router = require('express').Router();
const userRoute = require('./user-route');
const loginRoute = require('./login-route');
const signupRoute = require('./signup-route');
const appointmentRoute = require('./appointment-route');
const homepage = require("./homepage-route");


router.use('/user', userRoute);
router.use('/appointment', appointmentRoute);
router.use('/login', loginRoute);
router.use('/signup', signupRoute);
router.use('/homepage', homepage);


module.exports = router;