// routes/transportation.js
const express = require('express');
const router = express.Router();
const Transportation = require('../../config/transportation.model')
const Activity = require('../../config/activity.model')

// Get all transportations
router.get('/', async (req, res) => {
  try {
    const transportations = await Transportation.findAll();
    res.json(transportations);
  } catch (err) {
    res.json({ message: err });
  }
});

// Submit a transportation
router.post('/addTrans', async (req, res) => {
  const { name, activity_id } = req.body;

  try {
    // Dapatkan data activity berdasarkan activity_id
    const activity = await Activity.findByPk(activity_id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Buat dan simpan transportation dengan activity_id
    const transportation = await Transportation.create({
      name: name,
      activity_id: activity_id,
    });

    res.json(transportation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Specific transportation
router.get('/:transportationId', async (req, res) => {
  try {
    const transportation = await Transportation.findByPk(req.params.transportationId);
    res.json(transportation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete transportation
router.delete('/:transportationId', async (req, res) => {
  try {
    const removedTransportation = await Transportation.destroy({ where: { id: req.params.transportationId } });
    res.json(removedTransportation);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a transportation
router.patch('/:transportationId', async (req, res) => {
  try {
    const updatedTransportation = await Transportation.update(
      { name: req.body.name },
      { where: { id: req.params.transportationId } }
    );
    res.json(updatedTransportation);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;