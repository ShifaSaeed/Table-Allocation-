const express = require('express');
const router = express.Router();
const { Slot } = require('../models');

const DEFAULT_TIMES = [
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

// GET /api/slots?date=2026-05-25
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // Check karo slots exist karte hain is date ke liye
    let slots = await Slot.findAll({
      where: { date },
      order: [['id', 'ASC']]
    });

    // Agar nahi hain toh auto generate karo
    if (slots.length === 0) {
      const newSlots = DEFAULT_TIMES.map(time => ({
        time,
        date,
        isAvailable: true
      }));

      await Slot.bulkCreate(newSlots);

      slots = await Slot.findAll({
        where: { date },
        order: [['id', 'ASC']]
      });
    }

    res.json(slots);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;