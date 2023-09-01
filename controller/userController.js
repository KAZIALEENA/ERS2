const express = require('express');
const router = express.Router();
const User = require('../models/signup');

router.get('/', function (req, res) {
  res.render('user');
});

router.get('/emplist', function(req, res) {
  const query = {}; // Empty query to fetch all employees

  User.find(query)
    .then(users => {
      res.render('employees', { users: users });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    });
});


router.delete('/delete/:id', async function(req, res) {
  try {
    const userId = req.params.id; // Retrieve the user ID from the request parameters

    // Delete the user with the specified ID
    await User.deleteOne({ _id: userId });

    // Send a success response back to the client
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/edit/:id',async function(req,res){
  try{
  const userId = req.params.id;

  const users = await User.findById({ _id: userId });

  res.render('edit', {users});
  } catch (error) {
    console.error("Error retrieving container details:", error);
    res.render("error", { error });
  }

});

module.exports = router;
