const express = require('express');
const session = require('express-session');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const path = require('path');
const routes = require('./routes/app'); 
const bodyParser = require('body-parser');
const User = require('./models/signup');
const FeedBack = require('./models/feedback');
const Assign = require('./models/assign');


// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Routes
const userController = require('./controller/userController');
const authController = require('./controller/authController');

app.use('/', authController); // Handles login and signout routes
app.use('/user', userController); // Handles user-related routes


// Use the routes defined in 'routes/app.js'
app.use('/', routes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
