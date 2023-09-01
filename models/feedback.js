const mongoose = require('mongoose');
const User = require('./signup')

// Define the schema for the 'FeedBack' collection
const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    auto: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true, // Assuming email should be unique for each feedback
  },
  feedback: {
    type: String,
    required: true,
  },
});


// Create the 'FeedBack' model using the schema
const FeedBack = mongoose.model('FeedBack', feedbackSchema);
// Export the 'FeedBack' model for use in other modules
module.exports = FeedBack;
