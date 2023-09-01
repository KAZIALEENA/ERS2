const express = require('express');
const router = express.Router();

const employeeController = require('../controller/employeeController');
const feedbackController = require('../controller/feedbackController');
const assignController = require('../controller/assignController');
const userControllerV2 = require('../controller/userControllerV2');

// Employee routes
router.get('/emplist', employeeController.list);
router.get('/edit/:id', employeeController.edit);
router.post('/register/:id', employeeController.update);
router.delete('/delete/:id', employeeController.delete);

// Feedback routes
router.post('/feedback', feedbackController.saveFeedBack);
router.get('/hello', feedbackController.listFeedBack);
router.get('/update1/:id', userControllerV2.updateFeedBack);
router.post('/fdUpdate1/:id', userControllerV2.updateFeedBack);

// Assign routes
router.get('/assign', assignController.listAssign);
router.post('/work', assignController.assignWork);

// User routes

router.get('/user', userControllerV2.getUser);
//router.post('/user/update/:id', userControllerV2.updateFeedBack);


module.exports = router;
