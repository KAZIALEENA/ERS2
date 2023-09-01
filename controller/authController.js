const express = require('express');
const router = express.Router();

const User = require('../models/signup');
const Assign = require('../models/assign');
const FeedBack = require('../models/feedback');

router.get('/', function (req, res) {
  res.render('signup');
});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/signup', async function (req, res) {
    const { email, username, password, role } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({
      email,
      username,
      password,
      role,
    });

    // Save the user to the database
    await newUser.save();

    if(role === 'admin'){
      return res.redirect('admin');  
    }
    else{
      return res.redirect('user');
    }

    return res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/addemployee', async function (req, res) {
  const { email, username, password, role } = req.body;

try {
  // Create a new user instance
  const newUser = new User({
    email,
    username,
    password,
    role,
  });

  // Save the user to the database
  await newUser.save();
  return res.status(200).json({ message: 'edit successful' });
} catch (err) {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}
});

router.post('/login', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email in the database
  User.findOne({ email }) // Assuming the email field is used for login
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Authentication successful
      // You can include additional user information in the response if needed
      const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        // Add other properties you want to send back
      };

      if (user.role === 'employee') {
        // Fetch the Assign record where recipient matches the logged-in user's email
        Assign.findOne({ recipient: user.email })
          .exec()
          .then((assignment) => {
            // If an assignment is found, add the assignedTo value to the userData
            if (assignment) {
              userData.assignedTo = assignment.assignedTo;
            }

            FeedBack.find({ email: user.email })
              .exec()
              .then((feedbacks) => {
                // Add feedbacks to the userData
                userData.feedbacks = feedbacks;

            return res.render('user', { user: userData });
          })
          .catch((err) => {
            console.error('Error finding feedback:', err);
            return res.status(500).json({ message: 'Internal server error' });
          });
      })
      .catch((err) => {
        console.error('Error finding assignment:', err);
        return res.status(500).json({ message: 'Internal server error' });
      });
      } else {
        return res.render('admin', { user: userData });
      }
    })
    .catch((err) => {
      console.error('Error finding user:', err);
      return res.status(500).json({ message: 'Internal server error' });
    });
});


router.get('/home',function(req,res){
  res.render('admin');
});

router.get('/signout',function(req,res){
  res.render('signup');
});

router.get('/add',function(req,res){
  res.render('addemployee');
});

router.get('/user', function(req, res) {
  // Some code to retrieve user data
  const userData = {
    // User data here
  };

  res.render('user', { user: userData }); // Renders the 'user.ejs' template with user data
});



module.exports = router;
