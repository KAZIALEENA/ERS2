// Import model files
const User = require('../models/signup');
const Assign = require('../models/assign');


// Function to list all employees and render the 'assign' view with employee data
exports.listAssign = async function (req, res) {
  try {
    const roles = await User.find({ role: 'employee' }); // Retrieve all users with the role 'employee' from the database
    res.render('assign', { roles }); // Render the 'assign' view and pass the 'roles' data as the context
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to assign work to an employee
exports.assignWork = async function (req, res) {
  const { username, email } = req.body;
  try {
    const newAssign = new Assign({ assignedTo: username, recipient: email });
    const savedAssign = await newAssign.save();
    return res.status(200).json(savedAssign);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
