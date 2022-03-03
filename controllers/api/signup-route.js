const router = require('express').Router();
const { User } = require('../../models');

router.post('/', (req, res) => {
    console.log(req.body)
    User.create({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
  
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.email = dbUserData.email;
          req.session.password = dbUserData.password;
          req.session.firstname = dbUserData.firstname;
          req.session.lastname = dbUserData.lastname;
          req.session.loggedIn = true;
  
          res.json(dbUserData);
  
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;