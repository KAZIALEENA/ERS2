const FeedBack = require('../models/feedback');

//Function  to save feedback in database
exports.saveFeedBack = async function (req, res) {
  const { email, feedback } = req.body;
  try {
    const newFeedback = new FeedBack({ email, feedback });
    await newFeedback.save();
    return res.status(200).json({ message: 'Feedback saved successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//Functio to show all feedbacks
exports.listFeedBack = async function (req, res) {
  try {
    const data = await FeedBack.find({});
    res.render('feedback', { data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
