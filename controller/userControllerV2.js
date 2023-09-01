const Assign = require('../models/assign');
const FeedBack = require('../models/feedback');


// Function to get user details, recipient email, and assignment information
exports.getUser = async function (req, res) {
  try {
    const user = {
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      role: 'Employee',
      // Add other user details as needed
    };
    const recipientEmail = 'recipient@example.com';
    const assignment = await Assign.findOne({ recipient: recipientEmail });
    res.render('user', { user, recipientEmail, assignment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to update user feedback
exports.updateFeedBack = async function (req, res) {
  try {
    const userId = req.params.id;
    const updatedUserData = {
      email: req.body.email,
      feedback: req.body.feedback,
    };
    const users = await FeedBack.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    if (!users) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('updateFd', { users })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
