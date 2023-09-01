const User = require('../models/signup');


// Function to list all employees and render the 'employees' view with user data
exports.list = async function (req, res) {
  try {
    const users = await User.find({}); // Retrieve all users from the database
    res.render('employees', { users }); // Render the 'employees' view and pass the 'users' data as the context
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to render the 'edit' view with user data for a specific user
exports.edit = async function (req, res) {
  try {
    const userId = req.params.id;
    const users = await User.findById(userId);
    res.render('edit', { users });
  } catch (error) {
    console.error('Error retrieving container details:', error);
    res.render('error', { error });
  }
};


// Function to update user data for a specific user
exports.update = async function (req, res) {
  try {
    const userId = req.params.id;
    const updatedUserData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to delete a specific user
exports.delete = async function (req, res) {
  try {
    const userId = req.params.id;
    await User.deleteOne({ _id: userId });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

























