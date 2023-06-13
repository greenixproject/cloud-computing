// routes/activity.js
const express = require('express');
const router = express.Router();
const Activity = require('../../config/activity.model');

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (err) {
    res.json({ message: err });
  }
});

// Submit an activity
router.post('/addActivity', async (req, res) => {
  const activity = new Activity({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time
  });

  try {
    const savedActivity = await activity.save();
    res.json(savedActivity);
  } catch (err) {
    res.json({ message: err });
  }
});

// Specific activity
router.get('/:activityId', async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId);
    res.json(activity);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete activity
router.delete('/:activityId', async (req, res) => {
  try {
    const removedActivity = await Activity.destroy({ where: { id: req.params.activityId } });
    res.json(removedActivity);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update an activity
router.patch('/:activityId', async (req, res) => {
  try {
    const updatedActivity = await Activity.update(
      { name: req.body.name, date: req.body.date, time: req.body.time },
      { where: { id: req.params.activityId } }
    );
    res.json(updatedActivity);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;