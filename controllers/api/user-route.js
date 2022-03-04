const router = require('express').Router();
const { User } = require('../../models'); 


router.post('/', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });
  
  router.put('/:id', (req, res) => {
      User.update(req.body, {
          individualHooks: true,
          where: {
            id: req.params.id
          }
        })
          .then(dbUserData => {
            if (!dbUserData[0]) {
              res.status(404).json({ message: 'No user found' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
  
    router.delete('/:id', (req, res) => {
          User.destroy({
            where: {
              id: req.params.id
            }
          })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        });
  
  module.exports = router;

// get all users
router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//Get a single user
router.get('/:id', (req, res) => {
  User.findOne({
      attributes: { exclude: ['password'] },
      where: {
          id: req.params.id 
      }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'User not found' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// Create a new user
router.post('/', (req, res) => {
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


  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
       req.session.destroy(() => {
          res.status(204).end();
       });
    } else {
       res.status(404).end();
    }
  });
