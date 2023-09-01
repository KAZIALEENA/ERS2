const mongoose = require('mongoose');

// Define the schema for the 'User' collection
const userSchema = new mongoose.Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },

    email: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
    }
});

// Create the 'User' model using the schema
const User = mongoose.model('User', userSchema);
// Export the 'User' model for use in other modules
module.exports = User;