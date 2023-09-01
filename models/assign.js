const mongoose = require('mongoose');


// Define the schema for the 'Assign' collection
const assignSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    auto: true
  },

  assignedTo: { 
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
});


// Create the 'Assign' model using the schema
const Assign = mongoose.model('Assign', assignSchema);
// Export the 'Assign' model for use in other modules
module.exports = Assign;
